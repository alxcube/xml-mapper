import type { NodesArrayDataExtractorFn } from "./NodesArrayDataExtractorFn";

/**
 * NodesArrayDataExtractorFn factory interface.
 */
export interface NodesArrayDataExtractorFnFactory<
  ArrayDataExtractorReturnType,
> {
  /**
   * Creates NodesArrayDataExtractorFn function.
   */
  createNodesArrayDataExtractor(): NodesArrayDataExtractorFn<ArrayDataExtractorReturnType>;
}

/**
 * Checks if given value is NodesArrayDataExtractorFnFactory.
 *
 * @param obj
 */
export function isNodesArrayDataExtractorFnFactory(
  obj: unknown
): obj is NodesArrayDataExtractorFnFactory<unknown> {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "createNodesArrayDataExtractor" in obj &&
    typeof obj.createNodesArrayDataExtractor === "function"
  );
}
