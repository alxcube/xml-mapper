# xml-mapper
`xml-mapper` is a library designed for mapping XML documents to JavaScript objects
using a declarative builder with XPath expressions. It provides a type-safe approach
to mapping XML data to JavaScript objects.

## Features
* Declarative mapping: Define mappings using a fluent API with XPath expressions.
* Type-safe: Ensure type safety throughout the mapping process.
* Flexibility: Offers support for complex data structures, including recursive mapping, enabling the handling of intricate data hierarchies.

## Quick start
### Installation
`xml-mapper` requires [xpath](https://www.npmjs.com/package/xpath) package.

For use in environments without native DOM support, you can use [@xmldom/xmldom](https://www.npmjs.com/package/@xmldom/xmldom)
package.

```shell
npm i @alxcube/xml-mapper xpath @xmldom/xmldom
```

### Usage example

```ts
import { DOMParser } from "@xmldom/xmldom";
import { createObjectMapper, map } from "@alxcube/xml-mapper";

const xml = `
<User id="123" verified="false">
  <FirstName>John</FirstName>
  <LastName>Doe</LastName>
  <ContactData>
    <Email>johndoe@example.com</Email>
    <Phone>+1234567890</Phone>
  </ContactData>
  <Groups>
    <Group id="1">Registered</Group>
    <Group id="2">Customers</Group>
  </Groups>
  <RegistrationDate year="2024" month="2" day="28"/>
</User>
`;

interface User {
  id: number;
  isVerified: boolean;
  firstName: string;
  lastName: string;
  contacts?: {
    email?: string;
    phone?: string;
  };
  groups: { id: number; title: string }[];
  registeredAt: Date;
}

const mapper = createObjectMapper<User>({
  id: map().toNode("/User/@id").mandatory().asNumber().named("id"),
  isVerified: map()
    .toNode("/User/@verified")
    .asBoolean()
    .named("isVerified")
    .withDefault(false),
  firstName: map()
    .toNode("/User/FirstName")
    .mandatory()
    .asString()
    .named("firstName"),
  lastName: map()
    .toNode("/User/LastName")
    .mandatory()
    .asString()
    .named("lastName"),
  contacts: map()
    .toNode("/User/ContactData")
    .asObject({
      email: map().toNode("Email").asString().named("contacts.email"),
      phone: map().toNode("Phone").asString().named("contacts.phone"),
    })
    .named("contacts"),
  groups: map()
    .toNodesArray("/User/Groups/Group")
    .mandatory()
    .asArray()
    .ofObjects({
      id: map().toNode("@id").mandatory().asNumber().named("groups.*.id"),
      title: map()
        .toNode(".")
        .mandatory()
        .asString()
        .named("groups.*.title"),
    })
    .named("groups"),
  registeredAt: map()
    .toNode("/User/RegistrationDate")
    .mandatory()
    .callback((node, select) => {
      const year = select("number(@year)", node) as number;
      const month = select("number(@month)", node) as number;
      const day = select("number(@day)", node) as number;
      return new Date(year, month - 1, day);
    }),
});

const doc = new DOMParser().parseFromString(xml);

const user: User = mapper(doc);

console.log(user);

```

## Key Concepts:

### `SingleNodeDataExtractorFn`
```ts
import type { XPathSelect } from "xpath";

interface SingleNodeDataExtractorFn<DataExtractorReturnType> {
  (node: Node, xpathSelect: XPathSelect): DataExtractorReturnType;
}

```
A function that takes two parameters: the context DOM node
and the `XPathSelect` interface from the `xpath` library. The purpose of this function
is to return data of a specific type from the context node or its child nodes.


### `SingleNodeDataExtractorFnFactory`
```ts
interface SingleNodeDataExtractorFnFactory<DataExtractorReturnType> {
  createNodeDataExtractor(): SingleNodeDataExtractorFn<DataExtractorReturnType>;
}
```
An interface whose method `createNodeDataExtractor()` returns a function of type
`SingleNodeDataExtractorFn`.

### `SingleNodeLookupFn`
```ts
import type { XPathSelect } from "xpath";

interface SingleNodeLookupFn<NodeLookupResult extends Node | undefined> {
  (contextNode: Node, xpathSelect: XPathSelect): NodeLookupResult;
}

```
A function that takes two parameters: the context DOM node relative to which the
search is performed and the `XPathSelect` interface from the `xpath` library.
The returned result is a new context node for data extraction or `undefined` if the
searched node is absent.

### `NodesArrayDataExtractorFn`
```ts
import type { XPathSelect } from "xpath";

interface NodesArrayDataExtractorFn<ArrayDataExtractorReturnType> {
  (nodes: Node[], xpathSelect: XPathSelect): ArrayDataExtractorReturnType;
}

```
A function that takes two parameters: an array of context DOM nodes and the `XPathSelect`
interface from the `xpath` library. The purpose of this function is to return data of
a specific type from the array of context nodes.

### `NodesArrayDataExtractorFnFactory`
```ts
interface NodesArrayDataExtractorFnFactory<ArrayDataExtractorReturnType> {
  createNodesArrayDataExtractor(): NodesArrayDataExtractorFn<ArrayDataExtractorReturnType>;
}
```
An interface whose method `createNodesArrayDataExtractor()` returns a function of type
`NodesArrayDataExtractorFn`.

### `NodesArrayLookupFn`
```ts
import type { XPathSelect } from "xpath";

interface NodesArrayLookupFn<NodesLookupResult extends Node[] | undefined> {
  (contextNode: Node, xpathSelect: XPathSelect): NodesLookupResult;
}

```
A function that takes two parameters: the context DOM node relative to which the search
is performed and the `XPathSelect` interface from the `xpath` library. The returned
result is an array of context nodes for data extraction or undefined if the searched
nodes are absent.

### _Binding_
_Binding_ conceptual term for a function of type `SingleNodeDataExtractorFn` that
combines context node/array _lookup_ and _data extraction_ from the results of such a
search. _Bindings_ are constructed using the built-in builder. The `map()` function
is used to build _bindings_, returning a `MappingBuilder` interface. In subsequent
steps, the type of search (single node / array of nodes), the type of return value,
etc., are chosen (see detailed description below).

### `ObjectBlueprint`
```ts
type ObjectBlueprint<T extends object> = {
  [K in keyof T]:
  | SingleNodeDataExtractorFnFactory<T[K]>
  | SingleNodeDataExtractorFn<T[K]>;
};
```
An object whose property names correspond to the names of properties in the constructed
interface, and whose property values are either functions of type
`SingleNodeDataExtractorFn` or objects of the `SingleNodeDataExtractorFnFactory`
interface. Typically, these are _bindings_ or objects of the
`LookupToDataExtractorBindingBuilder` interface, which inherits
`SingleNodeDataExtractorFnFactory`, created using the `map()` helper.

To create a mapper, the `createObjectMapper()` helper is used, which takes an
`ObjectBlueprint` and returns a function – the _mapper_, similar in type to
`SingleNodeDataExtractorFn`, except that the second parameter is optional and
defaults to `xpath.select`.

To build an object of the required interface, you need to pass a top-level context
node (typically, a `Document`, but other nodes are also allowed) to this function.
If necessary, a second parameter - the `XPathSelect` interface, can be passed,
for example, if the document contains namespaces – using `xpath.useNamespaces()`.

Under the hood, this _mapper_ function iterates through all the keys of the passed
`ObjectBlueprint`, calling the `SingleNodeDataExtractorFn` functions lying under these
keys with the passed top-level node and `XPathSelect` interface as arguments, and
writes the returned values to the properties with the same names in the resulting
object. Thus, the output is an object constructed "according to the blueprint."


### Binding Workflow
