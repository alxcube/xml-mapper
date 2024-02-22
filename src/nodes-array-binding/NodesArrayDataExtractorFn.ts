import type { XPathSelect } from "xpath";

export interface NodesArrayDataExtractorFn<ArrayDataExtractorReturnType> {
  (nodes: Node[], xpathSelect: XPathSelect): ArrayDataExtractorReturnType;
}
