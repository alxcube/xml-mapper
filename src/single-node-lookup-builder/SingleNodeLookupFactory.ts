import type {
  SingleNodeLookupFn,
  SingleNodeLookupResult,
} from "../SingleNodeLookupFn";

export interface SingleNodeLookupFactory<T extends SingleNodeLookupResult> {
  createSingleNodeLookup(path: string): SingleNodeLookupFn<T>;
}
