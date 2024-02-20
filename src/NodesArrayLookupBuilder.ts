import type { NodesArrayDataMapperBuilder } from "./nodes-array-data-mapper/NodesArrayDataMapperBuilder";
import type { NodesArrayBindingBuilder } from "./NodesArrayBindingBuilder";
import type { NodesArrayDataExtractorFn } from "./NodesArrayDataExtractorFn";
import type { NodesArrayDataExtractorFnFactory } from "./NodesArrayDataExtractorFnFactory";

import type {
  NodesArrayLookupFn,
  NodesArrayLookupResult,
} from "./NodesArrayLookupFn";

export interface NodesArrayLookupBuilder<T extends NodesArrayLookupResult> {
  buildNodesArrayLookup(): NodesArrayLookupFn<T>;

  mandatory(): NodesArrayLookupBuilder<NonNullable<T>>;

  optional(): NodesArrayLookupBuilder<T | undefined>;

  asArray(): NodesArrayDataMapperBuilder<T>;

  callback<C>(
    cb: NodesArrayDataExtractorFn<C> | NodesArrayDataExtractorFnFactory<C>
  ): NodesArrayBindingBuilder<T, C>;
}
