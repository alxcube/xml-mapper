import type {
  SingleNodeDataExtractorFn,
  SingleNodeDataExtractorFnFactory,
} from "./single-node-binding";

export type ObjectBlueprint<T extends object> = {
  [K in keyof T]:
    | SingleNodeDataExtractorFnFactory<T[K]>
    | SingleNodeDataExtractorFn<T[K]>;
};
