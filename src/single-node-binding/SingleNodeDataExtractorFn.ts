import type { XPathSelect } from "xpath";

export interface SingleNodeDataExtractorFn<DataExtractorReturnType> {
  (node: Node, xpathSelect: XPathSelect): DataExtractorReturnType;
}
