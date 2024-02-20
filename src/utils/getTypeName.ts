export function getTypeName(item: unknown): string {
  return Object.prototype.toString.call(item).slice(8, -1);
}