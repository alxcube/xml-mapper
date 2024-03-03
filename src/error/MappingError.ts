import { joinMappingPath, toError } from "../utils";

/**
 * Mapping error, used to track error in mappings tree.
 */
export class MappingError extends Error {
  /**
   * Creates MappingError, using thrown error and mapping path segment, where error was caught.
   *
   * @param thrown
   * @param mappingPathSegment
   */
  static create(
    thrown: Error | unknown,
    mappingPathSegment: string | number
  ): MappingError {
    const cause = toError(thrown);
    const mappingPath =
      mappingPathSegment !== undefined ? [mappingPathSegment] : [];
    return new MappingError(cause, mappingPath);
  }

  /**
   * MappingError constructor.
   *
   * @param cause
   * @param mappingPath
   */
  constructor(
    public readonly cause: Error,
    public readonly mappingPath: (string | number)[] = []
  ) {
    super(
      `Error in mapping "${joinMappingPath(mappingPath)}", caused by ${cause}`
    );
    this.name = "MappingError";
  }

  /**
   * Used to add path segment to tracked error, while bubbling through mappings tree.
   *
   * @param mappingPathSegment
   */
  popUp(mappingPathSegment: string | number): this {
    this.mappingPath.unshift(mappingPathSegment);
    this.rebuildMessage();
    return this;
  }

  /**
   * Rebuilds error message to contain updated mapping path.
   *
   * @private
   */
  private rebuildMessage(): void {
    this.message = `Error in mapping "${joinMappingPath(this.mappingPath)}", caused by ${this.cause}`;
  }
}
