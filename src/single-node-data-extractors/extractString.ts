import type { XPathSelect } from "xpath";
import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";

export const extractString: SingleNodeDataExtractorFn<string> = (
  node: Node,
  xpathSelect: XPathSelect
): string => xpathSelect(`string(.)`, node) as string;
