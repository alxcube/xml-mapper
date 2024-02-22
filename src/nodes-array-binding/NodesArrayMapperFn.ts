import type { NodesArrayDataExtractorFn } from "./NodesArrayDataExtractorFn";

export type NodesArrayMapperFn<MapperFunctionReturnType> =
  NodesArrayDataExtractorFn<MapperFunctionReturnType[]>;
