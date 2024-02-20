import type { BindingInitializer } from "./BindingInitializer";
import { AnyNodesArrayLookupFactory } from "./nodes-array-lookup-builder/AnyNodesArrayLookupFactory";
import { AttributesArrayLookupFactory } from "./nodes-array-lookup-builder/AttributesArrayLookupFactory";
import { BaseNodesArrayLookupBuilder } from "./nodes-array-lookup-builder/BaseNodesArrayLookupBuilder";
import { ElementsArrayLookupFactory } from "./nodes-array-lookup-builder/ElementsArrayLookupFactory";
import type { NodesArrayLookupBuilder } from "./NodesArrayLookupBuilder";
import { AnyNodeLookupFactory } from "./single-node-lookup-builder/AnyNodeLookupFactory";
import { AttributeLookupFactory } from "./single-node-lookup-builder/AttributeLookupFactory";
import { BaseSingleNodeLookupBuilder } from "./single-node-lookup-builder/BaseSingleNodeLookupBuilder";
import { ElementLookupFactory } from "./single-node-lookup-builder/ElementLookupFactory";
import type { SingleNodeLookupBuilder } from "./SingleNodeLookupBuilder";

export class BaseBindingInitializer implements BindingInitializer {
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

export function bind(): BindingInitializer {
  return new BaseBindingInitializer();
}
