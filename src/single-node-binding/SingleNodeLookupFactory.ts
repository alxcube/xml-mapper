import type {
  SingleNodeLookupFn,
  SingleNodeLookupResult,
} from "./SingleNodeLookupFn";

export interface SingleNodeLookupFactory<
  LookupResultType extends SingleNodeLookupResult,
> {
  createSingleNodeLookup(path: string): SingleNodeLookupFn<LookupResultType>;
}
