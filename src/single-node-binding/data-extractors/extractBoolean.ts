import type { XPathSelect } from "xpath";
import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";

export const extractBoolean: SingleNodeDataExtractorFn<boolean> = (
  node: Node,
  xpathSelect: XPathSelect
): boolean => xpathSelect("boolean(.)", node) as boolean;
