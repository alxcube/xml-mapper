import type {
  NodesArrayLookupFn,
  NodesArrayLookupResult,
} from "../NodesArrayLookupFn";

export interface NodesArrayLookupFactory<T extends NodesArrayLookupResult> {
  createNodesArrayLookup(path: string): NodesArrayLookupFn<T>;
}
