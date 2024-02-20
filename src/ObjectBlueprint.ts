import type { SingleNodeDataExtractorFn } from "./SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "./SingleNodeDataExtractorFnFactory";

export type ObjectBlueprint<T extends object> = {
  [K in keyof T]:
    | SingleNodeDataExtractorFnFactory<T[K]>
    | SingleNodeDataExtractorFn<T[K]>;
};
