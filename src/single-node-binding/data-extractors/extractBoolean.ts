import type { XPathSelect } from "xpath";
import { stringToBoolean } from "../../utils";
import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import { extractString } from "./extractString";

/**
 * Extracts boolean value from node of any type, using conversion of string value to boolean value.
 *
 * @param node
 * @param xpathSelect
 */
export const extractBoolean: SingleNodeDataExtractorFn<boolean> = (
  node: Node,
  xpathSelect: XPathSelect
): boolean => stringToBoolean(extractString(node, xpathSelect));
