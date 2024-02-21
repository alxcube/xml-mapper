import { isNode } from "./isNode";

export function isElement(obj: unknown): obj is Element {
  return isNode(obj) && obj.nodeType === obj.ELEMENT_NODE;
}
