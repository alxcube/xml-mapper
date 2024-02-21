export function isNode(obj: unknown): obj is Node {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "nodeType" in obj &&
    typeof obj.nodeType === "number"
  );
}
