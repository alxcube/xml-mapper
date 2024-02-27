import type {
  SingleNodeLookupFn,
  SingleNodeLookupResult,
} from "./SingleNodeLookupFn";

/**
 * SingleNodeLookupFn factory.
 */
export interface SingleNodeLookupFactory<
  LookupResultType extends SingleNodeLookupResult,
> {
  /**
   * Creates SingleNodeLookupFn function, using given xpath expression.
   *
   * @param path
   */
  createSingleNodeLookup(path: string): SingleNodeLookupFn<LookupResultType>;
}
