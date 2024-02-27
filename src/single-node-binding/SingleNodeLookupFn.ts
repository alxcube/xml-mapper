import type { XPathSelect } from "xpath";

/**
 * Single node lookup result.
 */
export type SingleNodeLookupResult = Node | undefined;

/**
 * Single node lookup function. Accepts context node and XPathSelect interface, and returns reference node for
 * data extraction.
 */
export interface SingleNodeLookupFn<
  NodeLookupResult extends SingleNodeLookupResult,
> {
  (contextNode: Node, xpathSelect: XPathSelect): NodeLookupResult;
}
