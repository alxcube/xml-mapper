import type { XPathSelect } from "xpath";
import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";

export const extractNumber: SingleNodeDataExtractorFn<number> = (
  node: Node,
  xpathSelect: XPathSelect
): number => xpathSelect(`number(.)`, node) as number;
