export function isArrayLike(item: unknown): item is ArrayLike<unknown> {
  return (
    typeof item === "object" &&
    item !== null &&
    "length" in item &&
    typeof item.length === "number"
  );
}
