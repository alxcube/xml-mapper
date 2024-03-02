# xml-mapper

`xml-mapper` is a library designed for mapping XML documents to JavaScript objects
using a declarative builder with XPath expressions. It provides a type-safe approach
to mapping XML data to JavaScript objects.

## Features

- Declarative mapping: Define mappings using a fluent API with XPath expressions.
- Type-safe: Ensure type safety throughout the mapping process.
- Flexibility: Offers support for complex data structures, including recursive mapping, enabling the handling of intricate data hierarchies.

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

/**
 * Example interface
 */
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

// Define mapper function with 'createObjectMapper()'
const userMapper = createObjectMapper<User>({
  id: map("id") // Give mapping a name, which would help in debugging
    .toNode("/User/@id") // Search for 'id' attribute in User element
    .mandatory() // Make sure that reference node is present in xml.
    .asNumber(), // Use attribute value as number,
  isVerified: map("isVerified")
    .toNode("/User/@verified")
    .asBoolean()
    .withDefault(false), // Assign default value in case of reference node is not found
  firstName: map("firstName").toNode("/User/FirstName").mandatory().asString(),
  lastName: map("lastName").toNode("/User/LastName").mandatory().asString(),
  contacts: map("contacts")
    .toNode("/User/ContactData") // Search for Element node
    .asObject({
      email: map("email")
        .toNode("Email") // Nested objects xpath expression can be relative to reference element
        .asString(),
      phone: map("phone").toNode("Phone").asString(),
    }),
  groups: map("groups")
    .toNodesArray("/User/Groups/Group") // Search for array of elements
    .mandatory()
    .asArray()
    .ofObjects({
      id: map("id").toNode("@id").mandatory().asNumber(),
      title: map("id").toNode(".").mandatory().asString(),
    }),
  registeredAt: map("registeredAt")
    .toNode("/User/RegistrationDate")
    .mandatory()
    .callback((node, select) => {
      // Use custom callback for complex case: select attribute values, using xpath expression and return Date
      const year = select("number(@year)", node) as number;
      const month = select("number(@month)", node) as number;
      const day = select("number(@day)", node) as number;
      return new Date(year, month - 1, day);
    }),
});

// Parse XML
const doc = new DOMParser().parseFromString(xml);

// Get User object from parsed Document, using created mapper
const user: User = userMapper(doc);

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

### Binding

_Binding_ is a conceptual term for a function of type `SingleNodeDataExtractorFn` that
combines context node/array _lookup_ and _data extraction_ from the results of such a
search. _Bindings_ are constructed using the built-in builder. The `map()` function
is used to build _bindings_, returning a `MappingBuilder` interface. In subsequent
steps, the type of search (single node / array of nodes), the type of return value,
etc., are chosen (see detailed description below).

### Mapping

_Mapping_ is a conceptual term for a function of type `SingleNodeDataExtractorFn` or
object of type `SingleNodeDataExtractorFnFactory`, being assigned to property of
`ObjectBlueprint` object, and represents a mapping of such property to a value,
which is result of executing data extractor.

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

## Binding Workflow

The following steps are performed inside [binding](#binding):

1. Lookup is performed to find reference node(s).
2. 1. If reference node(s) is not found, and node is mandatory, `LookupError` is THROWN.
   2. If reference node(s) is not found, and node is not mandatory, _default value_
      is RETURNED.
3. If reference node(s) was found, data extractor function is called with that node(s).
4. If _extracted value_ is `undefined`, _default value_ is RETURNED.
5. 1. If conversion callback is set, _extracted value_ is passed to it to get _converted
      value_.
   2. If _converted value_ is `undefined`, _default value_ is RETURNED.
   3. _Converted value_ is RETURNED.
6. _Extracted value_ is RETURNED.

In above steps, _default value_ is undefined, unless it was set using `.withDefault()`
method.

## Building mappings

### Creating object mapper

To create object mapper function, `createObjectMapper()` helper is used:

```ts
import type { XPathSelect } from "xpath";

declare function createObjectMapper<ObjectType extends object>(
  blueprint: ObjectBlueprint<ObjectType>
): (node: Node, xpathSelect?: XPathSelect) => ObjectType;
```

It takes single argument of type [ObjectBlueprint](#objectblueprint) and returns
mapper function. This returned function accepts root context node (typically of
`Document` type), and optionally `XPathSelect` interface. The latter is useful
when namespaces are used in document, and `xpath` should be configured for namespaces
support:

```ts
import { DOMParser } from "@xmldom/xmldom";
import xpath from "xpath";
import { createObjectMapper, map } from "@alxcube/xml-mapper";

const xml = `<Link xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="https://example.com"/>`;
const doc = new DOMParser().parseFromString(xml);
const mapper = createObjectMapper({
  url: map("url").toNode("/Link@xlink:href").asString(),
});
const select = xpath.useNamespaces({
  xlink: "http://www.w3.org/1999/xlink",
});
const result = mapper(doc, select);
```

### Defining `ObjectBlueprint`

For object blueprint definition, `map()` helper is used. It accepts optional string
argument - mapping name, which can be omitted, but it is recommended to give mapping
a name, identical to object blueprint property being mapped -- this may be helpful
for debugging, when error occurs somewhere in mappings tree.

Single mapping consists of two main steps: definition of reference node(s) lookup
and definition of return type:

```ts
const objectBlueprint = {
  string: map()
    .toNode("//Element/@id") // Looks for attribute "id" in <Element> node
    .asString(), // Returns attribute value as string
  arrayOfNumbers: map()
    .toNodesArray("//List/Item/@ordering") // Looks for array of attributes "ordering"
    .asArray()
    .ofNumbers(), // Returns array of attributes values as array of numbers
};
```

After return type is specified, instance of `LookupToDataExtractorBindingBuilder`
interface is returned. This interface extends `SingleNodeDataExtractorFnFactory`,
so the `objectBlueprint` inferred type in above example will be as follows:

```ts
type TypeofExampleObjectBlueprint = {
  string: SingleNodeDataExtractorFnFactory<string | undefined>;
  arrayOfNumbers: SingleNodeDataExtractorFnFactory<number[] | undefined>;
};
```

and the result object type will be:

```ts
type TypeOfExampleResultObject = {
  string: string | undefined;
  arrayOfNumbers: number[] | undefined;
};
```

### Non-nullable types inference

As seen above, the default mapping inferred type may be `undefined`. But your mapped
interface probably have required members. There are two ways, that remove `undefined`
from inferred types: _mandatory reference node(s) lookup_ and _default value_.

#### Mandatory lookup

You can use `.mandatory()` method after setting lookup:

```ts
interface NonNullableObject {
  string: string;
  arrayOfNumbers: number[];
}

const blueprint: ObjectBlueprint<NonNullableObject> = {
  string: map()
    .toNode("/Path/To/Node")
    .mandatory() // Mandatory node lookup
    .asString(),
  arrayOfNumbers: map()
    .toNodesArray("/Path/To/NodesArray")
    .mandatory() // Mandatory array of nodes lookup
    .asArray()
    .ofNumbers(),
};
```

When lookup is made mandatory, an error will be thrown if reference node is not found.
This allows to exclude `undefined` from inferred type union, and guarantees that
mapped value will not be `undefined`. It worth noting that when using custom data
extraction callback, which has `undefined` in its return type union, the inferred
type of mapping will still have `undefined`, unless you set a default value.

#### Default value

The other way to remove `undefined` from inferred mapping type union is using
`.withDefault()` method:

```ts
interface NonNullableObject {
  string: string;
  arrayOfNumbers: number[];
}

const blueprint: ObjectBlueprint<NonNullableObject> = {
  string: map().toNode("/Path/To/Node").asString().withDefault(""),
  arrayOfNumbers: map()
    .toNodesArray("/Path/To/NodesArray")
    .asArray()
    .ofNumbers()
    .withDefault([]),
};
```

Default value is returned when reference node(s) is not found, when extracted data is
`undefined` or when converted data (see below) is `undefined`.

### Converting extracted data

You can use `.withConversion()` method to convert extracted value to other type. This
method accepts a conversion callback, which should accept data of data extractor return
type and return converted data.

Default value type, set after setting conversion callback, should be of same type as
conversion callback returns.

If any default value was set before calling `.withConversion()` method, it is reset to
`undefined`.

```ts
type YesNo = "yes" | "no";

interface Example {
  yesno: YesNo;
  date?: Date;
  num: number;
}

const blueprint: ObjectBlueprint<Example> = {
  yesno: map()
    .toNode("/Path/To/Boolean")
    .asBoolean()
    .withDefault(false) // this default value will be reset by .withConversion() call
    .withConversion((val) => (val ? "yes" : "no"))
    .withDefault("no"), // default value should have type, compatible with converted value
  date: map()
    .toNode("/Path/To/Date/String")
    .asString()
    .withConversion((strVal) => new Date(Date.parse(strVal))),
  num: map()
    .toNode("/Path/To/Exponential/Number")
    .asString()
    .withConversion(parseFloat)
    .withDefault(0),
};
```

## Available mappings

### Single node mappings

#### String

Extracts string value from any node.

```ts
map().toNode("path").asString();
```

---

#### Number

Extracts number value from any node. Supported formats:

- Numbers in decimal format: `0`, `-0`, `1`, `-1.23`;
- Fractional numbers without an integer part: `.75`, `-.75`;
- `Infinity` and `-Infinity` strings.

When value is not numeric, returns `NaN`.

```ts
map().toNode("path").asNumber();
```

---

#### Boolean

Extracts boolean values. The following string values are cast to `false`:

- `"false"` in any case;
- `"null"` in any case;
- empty string;
- any numeric string, that equals to `0`: `"0"`, `"-0"`, `"0.00"`

All other non-empty string values are cast to `true`.

```ts
map().toNode("path").asBoolean();
```

---

#### Object

Accepts `ObjectBlueprint` as argument. XPath expressions of mappings in such blueprint
may be relative to reference (context) node.

```ts
map()
  .toNode("path/to/context/node")
  .asObject({
    num: map().toNode("@numeric-attribute").asNumber(),
    str: map().toNode("ChildElement").asString(),
  });
```

#### Recursive object

Accepts callback, which should return `ObjectBlueprint`. A single argument of type
`RecursiveObjectFactoryScope`. You can use its `getDepth()` method inside callback
to get recursion depth. This given argument should be passed to `.asRecursiveObject()`
method in nested mapping definition.

```ts
const xml = `
<Root>
    <Child>
        <Title>Level 0</Title>
        <Child>
            <Title>Level 1</Title>
            <Child>
                <Title>Level 2</Title>
            </Child>
        </Child>    
    </Child>
</Root>
`;

interface TestRecursion {
  title: string;
  level: number;
  child?: TestRecursion;
}

const blueprint: ObjectBlueprint<{ recursiveObject: TestRecursion }> = {
  recursiveObject: map()
    .toNode("/Root/Child")
    .mandatory()
    .asRecursiveObject((recursion) => {
      return {
        title: map().toNode("Title").mandatory().asString(),
        level: map().constant(recursion.getDepth()),
        child: map().toNode("Child").asRecursiveObject(recursion),
      };
    })
    .createNodeDataExtractor()(doc, xs),
};
```

---

#### Custom data extractor

You can pass callback to `.callback()` method to extract custom data. Inferred type
of mapping becomes return type of callback, so when mapping required interface
property, give a default value to mapping if callback may return `undefined`.

```ts
import { isElement } from "xpath";

map()
  .toNode("/Path/To/Date")
  .mandatory()
  .callback((node, select) => {
    if (!isElement(node)) {
      return undefined;
    }
    const year = select("number(@year)", node) as number;
    const month = select("number(@month)", node) as number;
    const day = select("number(@day)", node) as number;
    return new Date(year, month - 1, day);
  })
  .withDefault(new Date());
```
