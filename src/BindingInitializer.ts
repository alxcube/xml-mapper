import type { NodesArrayLookupBuilder } from "./nodes-array-binding";
import type { SingleNodeLookupBuilder } from "./single-node-binding";

export interface BindingInitializer {
  toNode(path: string): SingleNodeLookupBuilder<Node | undefined>;

  toElement(path: string): SingleNodeLookupBuilder<Element | undefined>;

  toAttribute(path: string): SingleNodeLookupBuilder<Attr | undefined>;

  toNodesArray(path: string): NodesArrayLookupBuilder<Node[] | undefined>;

  toElementsArray(path: string): NodesArrayLookupBuilder<Element[] | undefined>;

  toAttributesArray(path: string): NodesArrayLookupBuilder<Attr[] | undefined>;
}
