import { MappingError } from "./MappingError";

/**
 * Error in binding.
 */
export class BindingError extends MappingError {
  /**
   * BindingError constructor.
   *
   * @param message
   * @param bindingName
   * @param cause
   */
  constructor(
    message: string,
    public readonly bindingName: string,
    cause?: Error | unknown
  ) {
    super(message, cause);
    this.name = "BindingError";
  }
}
