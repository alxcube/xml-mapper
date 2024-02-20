import type { SingleNodeDataExtractorFn } from "./single-node-binding/SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "./single-node-binding/SingleNodeDataExtractorFnFactory";

export type ObjectBlueprint<T extends object> = {
  [K in keyof T]:
    | SingleNodeDataExtractorFnFactory<T[K]>
    | SingleNodeDataExtractorFn<T[K]>;
};
