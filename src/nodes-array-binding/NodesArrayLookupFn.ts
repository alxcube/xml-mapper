import type { XPathSelect } from "xpath";

/**
 * Nodes array lookup result.
 */
export type NodesArrayLookupResult = Node[] | undefined;

/**
 * Nodes array lookup function. Accepts context node and XPathSelect interface, and returns array of reference nodes
 * for data extraction.
 */
export interface NodesArrayLookupFn<
  NodesLookupResult extends NodesArrayLookupResult,
> {
  (contextNode: Node, xpathSelect: XPathSelect): NodesLookupResult;
}
