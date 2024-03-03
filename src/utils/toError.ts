/**
 * Creates error from any value, converting it to string and setting as error message.
 * If given error, it is returned as is.
 *
 * @param thrown
 */
export function toError(thrown: Error | unknown): Error {
  return thrown instanceof Error ? thrown : new Error(String(thrown));
}
