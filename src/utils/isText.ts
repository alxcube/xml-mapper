import { isNode } from "./isNode";

export function isText(obj: unknown): obj is Text {
  return isNode(obj) && obj.nodeType === obj.TEXT_NODE;
}
