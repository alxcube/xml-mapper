import type {
  SingleNodeDataExtractorFn,
  SingleNodeDataExtractorFnFactory,
} from "./single-node-binding";

/**
 * Object with SingleNodeDataExtractorFn callbacks as props values, which defines shape of result object.
 */
export type ObjectBlueprint<T extends object> = {
  [K in keyof T]:
    | SingleNodeDataExtractorFnFactory<T[K]>
    | SingleNodeDataExtractorFn<T[K]>;
};
