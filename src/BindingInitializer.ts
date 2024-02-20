import type { NodesArrayLookupBuilder } from "./NodesArrayLookupBuilder";
import type { SingleNodeLookupBuilder } from "./SingleNodeLookupBuilder";

export interface BindingInitializer {
  toNode(path: string): SingleNodeLookupBuilder<Node | undefined>;

  toElement(path: string): SingleNodeLookupBuilder<Element | undefined>;

  toAttribute(path: string): SingleNodeLookupBuilder<Attr | undefined>;

  toNodesArray(path: string): NodesArrayLookupBuilder<Node[] | undefined>;

  toElementsArray(path: string): NodesArrayLookupBuilder<Element[] | undefined>;

  toAttributesArray(path: string): NodesArrayLookupBuilder<Attr[] | undefined>;
}
