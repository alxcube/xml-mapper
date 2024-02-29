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

  /**
   * Returns initial error in bindings hierarchy.
   */
  getInitialCause(): Error | unknown | undefined {
    if (!this.cause) {
      return undefined;
    }

    if (this.cause instanceof MappingError) {
      const initialCause = this.cause.getInitialCause();
      if (initialCause === undefined) {
        return this.cause;
      }
      return initialCause;
    }

    return this.cause;
  }
}
