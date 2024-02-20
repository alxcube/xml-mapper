import type { XPathSelect } from "xpath";

export type NodesArrayLookupResult = Node[] | undefined;

export interface NodesArrayLookupFn<T extends NodesArrayLookupResult> {
  (contextNode: Node, xpathSelect: XPathSelect): T;
}
