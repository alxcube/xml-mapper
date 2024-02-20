import type { SingleNodeDataExtractorFnFactory } from "./SingleNodeDataExtractorFnFactory";
import type { SingleNodeLookupResult } from "./SingleNodeLookupFn";

export type DependentOfNodeLookupResult<
  L extends SingleNodeLookupResult,
  T,
> = L extends undefined ? T | undefined : T;

export type DependentOfDefaultValue<
  T,
  D extends T | undefined,
> = T extends undefined ? (D extends undefined ? T | D : D) : T;

export type DependentOfNodeLookupResultAndDefaultValue<
  L extends SingleNodeLookupResult,
  T,
  D extends T | undefined,
> = DependentOfDefaultValue<DependentOfNodeLookupResult<L, T>, D>;
export interface SingleNodeBindingBuilder<
  L extends SingleNodeLookupResult,
  T,
  D extends T | undefined = undefined,
> extends SingleNodeDataExtractorFnFactory<
    DependentOfNodeLookupResultAndDefaultValue<L, T, D>
  > {
  withDefault<DT extends T | undefined>(
    defaultValue: DT
  ): SingleNodeBindingBuilder<L, T, DT>;

  named(name: string): SingleNodeBindingBuilder<L, T, D>;
}
