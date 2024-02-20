import type { XPathSelect } from "xpath";

export type SingleNodeLookupResult = Node | undefined;

export interface SingleNodeLookupFn<T extends SingleNodeLookupResult> {
  (contextNode: Node, xpathSelect: XPathSelect): T;
}
