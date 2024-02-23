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

export function isNodesArrayLookupBuilder(
  obj: unknown
): obj is NodesArrayLookupBuilder<NodesArrayLookupResult> {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "buildNodesArrayLookup" in obj &&
    typeof obj.buildNodesArrayLookup === "function" &&
    "mandatory" in obj &&
    typeof obj.mandatory === "function" &&
    "optional" in obj &&
    typeof obj.optional === "function" &&
    "asArray" in obj &&
    typeof obj.asArray === "function" &&
    "callback" in obj &&
    typeof obj.callback === "function"
  );
}
