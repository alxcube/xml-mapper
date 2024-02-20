import type { BindingInitializer } from "./BindingInitializer";
import { AnyNodesArrayLookupFactory } from "./nodes-array-binding/lookup/AnyNodesArrayLookupFactory";
import { AttributesArrayLookupFactory } from "./nodes-array-binding/lookup/AttributesArrayLookupFactory";
import { BaseNodesArrayLookupBuilder } from "./nodes-array-binding/lookup/BaseNodesArrayLookupBuilder";
import { ElementsArrayLookupFactory } from "./nodes-array-binding/lookup/ElementsArrayLookupFactory";
import type { NodesArrayLookupBuilder } from "./nodes-array-binding/NodesArrayLookupBuilder";
import { AnyNodeLookupFactory } from "./single-node-binding/lookup/AnyNodeLookupFactory";
import { AttributeLookupFactory } from "./single-node-binding/lookup/AttributeLookupFactory";
import { BaseSingleNodeLookupBuilder } from "./single-node-binding/lookup/BaseSingleNodeLookupBuilder";
import { ElementLookupFactory } from "./single-node-binding/lookup/ElementLookupFactory";
import type { SingleNodeLookupBuilder } from "./single-node-binding/SingleNodeLookupBuilder";

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
