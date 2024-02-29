import type { LookupToDataExtractorBindingBuilder } from "../LookupToDataExtractorBindingBuilder";
import type { NodesArrayDataMapperBuilder } from "./NodesArrayDataMapperBuilder";
import type { NodesArrayDataExtractorFn } from "./NodesArrayDataExtractorFn";
import type { NodesArrayDataExtractorFnFactory } from "./NodesArrayDataExtractorFnFactory";

import type {
  NodesArrayLookupFn,
  NodesArrayLookupResult,
} from "./NodesArrayLookupFn";

/**
 * Nodes array lookup builder.
 */
export interface NodesArrayLookupBuilder<
  NodesLookupResult extends NodesArrayLookupResult,
> {
  /**
   * Creates nodes array lookup function.
   */
  buildNodesArrayLookup(): NodesArrayLookupFn<NodesLookupResult>;

  /**
   * Makes lookup result mandatory, which means that if reference nodes are not found in lookup,
   * Error will be thrown.
   */
  mandatory(): NodesArrayLookupBuilder<NonNullable<NodesLookupResult>>;

  /**
   * Makes result lookup optional, which means that if reference nodes are not found in lookup, undefined will be
   * returned.
   */
  optional(): NodesArrayLookupBuilder<NodesLookupResult | undefined>;

  /**
   * Returns NodesArrayDataMapperInterface for specifying array data type.
   */
  asArray(): NodesArrayDataMapperBuilder<NodesLookupResult>;

  /**
   * Returns builder of binding to array data extractor using NodesArrayDataExtractorFn callback or
   * NodesArrayDataExtractorFnFactory.
   *
   * @param cb
   */
  callback<C>(
    cb: NodesArrayDataExtractorFn<C> | NodesArrayDataExtractorFnFactory<C>
  ): LookupToDataExtractorBindingBuilder<NodesLookupResult, C>;

  /**
   * Returns xpath expression, used for nodes lookup.
   */
  getPath(): string;
}

/**
 * Checks if given value is NodesArrayLookupBuilder.
 *
 * @param obj
 */
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
