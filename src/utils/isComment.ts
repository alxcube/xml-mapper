import { isNode } from "./isNode";

export function isComment(obj: unknown): obj is Comment {
  return isNode(obj) && obj.nodeType === obj.COMMENT_NODE;
}
