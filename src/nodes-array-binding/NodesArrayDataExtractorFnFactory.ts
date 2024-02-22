import type { NodesArrayDataExtractorFn } from "./NodesArrayDataExtractorFn";

export interface NodesArrayDataExtractorFnFactory<
  ArrayDataExtractorReturnType,
> {
  createNodesArrayDataExtractor(): NodesArrayDataExtractorFn<ArrayDataExtractorReturnType>;
}

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
