import type { XPathSelect } from "xpath";

export interface NodesArrayDataExtractorFn<T> {
  (nodes: Node[], xpathSelect: XPathSelect): T;
}
