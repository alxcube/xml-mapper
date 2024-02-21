import { isNode } from "./isNode";

export function isAttr(obj: unknown): obj is Attr {
  return isNode(obj) && obj.nodeType === obj.ATTRIBUTE_NODE;
}
