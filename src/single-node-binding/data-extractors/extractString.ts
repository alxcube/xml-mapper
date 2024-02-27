import type { XPathSelect } from "xpath";
import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";

/**
 * Extracts string value from node of any type.
 *
 * @param node
 * @param xpathSelect
 */
export const extractString: SingleNodeDataExtractorFn<string> = (
  node: Node,
  xpathSelect: XPathSelect
): string => xpathSelect(`string(.)`, node) as string;
