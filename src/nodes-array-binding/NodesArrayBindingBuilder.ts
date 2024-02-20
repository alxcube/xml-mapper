import type { NodesArrayLookupResult } from "./NodesArrayLookupFn";
import type { DependentOfDefaultValue } from "../single-node-binding/SingleNodeBindingBuilder";
import type { SingleNodeDataExtractorFnFactory } from "../single-node-binding/SingleNodeDataExtractorFnFactory";

export type DependentOfNodesArrayLookupResult<
  L extends NodesArrayLookupResult,
  T,
> = L extends undefined ? T | undefined : T;

export type DependentOfNodesArrayLookupResultAndDefaultValue<
  L extends NodesArrayLookupResult,
  T,
  D extends T | undefined,
> = DependentOfDefaultValue<DependentOfNodesArrayLookupResult<L, T>, D>;
export interface NodesArrayBindingBuilder<
  L extends NodesArrayLookupResult,
  T,
  D extends T | undefined = undefined,
> extends SingleNodeDataExtractorFnFactory<
    DependentOfNodesArrayLookupResultAndDefaultValue<L, T, D>
  > {
  withDefault<DT extends T | undefined>(
    defaultValue: DT
  ): NodesArrayBindingBuilder<L, T, DT>;

  named(name: string): NodesArrayBindingBuilder<L, T, D>;
}
