import type { XPathSelect } from "xpath";

/**
 * Nodes array data extractor function. Accepts array of reference nodes and XPathSelect interface and returns extracted
 * data.
 */
export interface NodesArrayDataExtractorFn<ArrayDataExtractorReturnType> {
  (nodes: Node[], xpathSelect: XPathSelect): ArrayDataExtractorReturnType;
}
