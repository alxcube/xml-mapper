import type { NodesArrayDataMapperBuilder } from "./NodesArrayDataMapperBuilder";
import type { NodesArrayBindingBuilder } from "./NodesArrayBindingBuilder";
import type { NodesArrayDataExtractorFn } from "./NodesArrayDataExtractorFn";
import type { NodesArrayDataExtractorFnFactory } from "./NodesArrayDataExtractorFnFactory";

import type {
  NodesArrayLookupFn,
  NodesArrayLookupResult,
} from "./NodesArrayLookupFn";

export interface NodesArrayLookupBuilder<
  NodesLookupResult extends NodesArrayLookupResult,
> {
  buildNodesArrayLookup(): NodesArrayLookupFn<NodesLookupResult>;

  mandatory(): NodesArrayLookupBuilder<NonNullable<NodesLookupResult>>;

  optional(): NodesArrayLookupBuilder<NodesLookupResult | undefined>;

  asArray(): NodesArrayDataMapperBuilder<NodesLookupResult>;

  callback<C>(
    cb: NodesArrayDataExtractorFn<C> | NodesArrayDataExtractorFnFactory<C>
  ): NodesArrayBindingBuilder<NodesLookupResult, C>;
}
