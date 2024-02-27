import type {
  NodesArrayLookupFn,
  NodesArrayLookupResult,
} from "./NodesArrayLookupFn";

/**
 * NodesArrayLookupFn factory.
 */
export interface NodesArrayLookupFactory<
  NodesLookupResult extends NodesArrayLookupResult,
> {
  /**
   * Creates NodesArrayLookupFn function, using given xpath expression.
   *
   * @param path
   */
  createNodesArrayLookup(path: string): NodesArrayLookupFn<NodesLookupResult>;
}
