import type { XPathSelect } from "xpath";

export type SingleNodeLookupResult = Node | undefined;

export interface SingleNodeLookupFn<
  NodeLookupResult extends SingleNodeLookupResult,
> {
  (contextNode: Node, xpathSelect: XPathSelect): NodeLookupResult;
}
