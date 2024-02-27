import type { SingleNodeDataExtractorFn } from "./SingleNodeDataExtractorFn";

/**
 * SingleNodeDataExtractorFn factory interface.
 */
export interface SingleNodeDataExtractorFnFactory<DataExtractorReturnType> {
  /**
   * Creates SingleNodeDataExtractorFn function.
   */
  createNodeDataExtractor(): SingleNodeDataExtractorFn<DataExtractorReturnType>;
}

/**
 * Checks if given value is SingleNodeDataExtractorFnFactory
 *
 * @param obj
 */
export function isSingleNodeDataExtractorFnFactory(
  obj: unknown
): obj is SingleNodeDataExtractorFnFactory<unknown> {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "createNodeDataExtractor" in obj &&
    typeof obj.createNodeDataExtractor === "function"
  );
}
