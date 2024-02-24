import type { MappingBuilder } from "./MappingBuilder";
import {
  AnyNodesArrayLookupFactory,
  AttributesArrayLookupFactory,
  BaseNodesArrayLookupBuilder,
  ElementsArrayLookupFactory,
} from "./nodes-array-binding";
import type { NodesArrayLookupBuilder } from "./nodes-array-binding";
import {
  AnyNodeLookupFactory,
  AttributeLookupFactory,
  BaseSingleNodeLookupBuilder,
  ElementLookupFactory,
} from "./single-node-binding";
import type { SingleNodeLookupBuilder } from "./single-node-binding";

export class BaseMappingBuilder implements MappingBuilder {
  toAttribute(path: string): SingleNodeLookupBuilder<Attr | undefined> {
    return new BaseSingleNodeLookupBuilder(new AttributeLookupFactory(), path);
  }

  toAttributesArray(path: string): NodesArrayLookupBuilder<Attr[] | undefined> {
    return new BaseNodesArrayLookupBuilder(
      new AttributesArrayLookupFactory(),
      path
    );
  }

  toElement(path: string): SingleNodeLookupBuilder<Element | undefined> {
    return new BaseSingleNodeLookupBuilder(new ElementLookupFactory(), path);
  }

  toElementsArray(
    path: string
  ): NodesArrayLookupBuilder<Element[] | undefined> {
    return new BaseNodesArrayLookupBuilder(
      new ElementsArrayLookupFactory(),
      path
    );
  }

  toNode(path: string): SingleNodeLookupBuilder<Node | undefined> {
    return new BaseSingleNodeLookupBuilder(new AnyNodeLookupFactory(), path);
  }

  toNodesArray(path: string): NodesArrayLookupBuilder<Node[] | undefined> {
    return new BaseNodesArrayLookupBuilder(
      new AnyNodesArrayLookupFactory(),
      path
    );
  }
}

export function map(): MappingBuilder {
  return new BaseMappingBuilder();
}
