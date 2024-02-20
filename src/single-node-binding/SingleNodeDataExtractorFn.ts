import type { XPathSelect } from "xpath";

export interface SingleNodeDataExtractorFn<T> {
  (node: Node, xpathSelect: XPathSelect): T;
}
