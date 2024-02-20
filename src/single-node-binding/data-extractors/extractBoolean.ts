import type { XPathSelect } from "xpath";
import { stringToBoolean } from "../../utils";
import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import { extractString } from "./extractString";

export const extractBoolean: SingleNodeDataExtractorFn<boolean> = (
  node: Node,
  xpathSelect: XPathSelect
): boolean => stringToBoolean(extractString(node, xpathSelect));
