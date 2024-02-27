import type { XPathSelect } from "xpath";
import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";

/**
 * Extracts number value from node of any type.
 *
 * @param node
 * @param xpathSelect
 */
export const extractNumber: SingleNodeDataExtractorFn<number> = (
  node: Node,
  xpathSelect: XPathSelect
): number => xpathSelect(`number(.)`, node) as number;
