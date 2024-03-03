/**
 * Joins mapping path segments array into path string.
 *
 * @param segments
 */
export function joinMappingPath(segments: (string | number)[]): string {
  let path = "";

  for (const segment of segments) {
    if (typeof segment === "number") {
      path = `${path}[${segment}]`;
    } else {
      path = path.length ? `${path}.${segment}` : segment;
    }
  }
  return path;
}
