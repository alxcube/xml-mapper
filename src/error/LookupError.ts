import { MappingError } from "./MappingError";

/**
 * Error in node lookup.
 */
export class LookupError extends MappingError {
  /**
   * LookupError constructor.
   *
   * @param message
   * @param cause
   * @param path
   */
  constructor(
    message: string,
    cause?: Error | any,
    public readonly path?: string
  ) {
    super(message, cause);
    this.name = "LookupError";
  }
}
