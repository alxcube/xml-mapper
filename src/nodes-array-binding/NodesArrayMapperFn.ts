import type { NodesArrayDataExtractorFn } from "./NodesArrayDataExtractorFn";

/**
 * Data extractor function that takes array of nodes and XPathSelect interface, and returns array, which is result
 * of mapping nodes array, using SingleNodeDataExtractorFn for each node.
 */
export type NodesArrayMapperFn<MapperFunctionReturnType> =
  NodesArrayDataExtractorFn<MapperFunctionReturnType[]>;
