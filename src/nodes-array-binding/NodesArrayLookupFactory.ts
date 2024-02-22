import type {
  NodesArrayLookupFn,
  NodesArrayLookupResult,
} from "./NodesArrayLookupFn";

export interface NodesArrayLookupFactory<
  NodesLookupResult extends NodesArrayLookupResult,
> {
  createNodesArrayLookup(path: string): NodesArrayLookupFn<NodesLookupResult>;
}
