/**
 * Base mapping error class.
 */
export class MappingError extends Error {
  /**
   * MappingError constructor.
   *
   * @param message
   * @param cause
   */
  constructor(
    message: string,
    public readonly cause?: Error | unknown
  ) {
    super(message);
    this.name = "MappingError";
  }
}
