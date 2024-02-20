import type { SingleNodeDataExtractorFn } from "./SingleNodeDataExtractorFn";

export interface SingleNodeDataExtractorFnFactory<T> {
  createNodeDataExtractor(): SingleNodeDataExtractorFn<T>;
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
