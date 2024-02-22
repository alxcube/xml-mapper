import type { XPathSelect } from "xpath";

export type NodesArrayLookupResult = Node[] | undefined;

export interface NodesArrayLookupFn<
  NodesLookupResult extends NodesArrayLookupResult,
> {
  (contextNode: Node, xpathSelect: XPathSelect): NodesLookupResult;
}
