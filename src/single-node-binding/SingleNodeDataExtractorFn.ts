import type { XPathSelect } from "xpath";

/**
 * Single node data extractor function. Accepts reference node and XPathSelect interface and returns extracted data.
 */
export interface SingleNodeDataExtractorFn<DataExtractorReturnType> {
  (node: Node, xpathSelect: XPathSelect): DataExtractorReturnType;
}
