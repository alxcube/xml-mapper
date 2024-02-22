import type { SingleNodeDataExtractorFn } from "./SingleNodeDataExtractorFn";

export interface SingleNodeDataExtractorFnFactory<DataExtractorReturnType> {
  createNodeDataExtractor(): SingleNodeDataExtractorFn<DataExtractorReturnType>;
}

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
