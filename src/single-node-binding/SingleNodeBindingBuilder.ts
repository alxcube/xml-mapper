import type { SingleNodeDataExtractorFnFactory } from "./SingleNodeDataExtractorFnFactory";
import type { SingleNodeLookupResult } from "./SingleNodeLookupFn";

export type DependentOfNodeLookupResult<
  LookupResultType extends SingleNodeLookupResult,
  DataExtractorReturnType,
> = LookupResultType extends undefined
  ? DataExtractorReturnType | undefined
  : DataExtractorReturnType;

export type DependentOfDefaultValue<
  DataExtractorReturnType,
  DefaultValueType extends DataExtractorReturnType | undefined,
> = DataExtractorReturnType extends undefined
  ? DefaultValueType extends undefined
    ? DataExtractorReturnType | DefaultValueType
    : DefaultValueType
  : DataExtractorReturnType;

export type DependentOfNodeLookupResultAndDefaultValue<
  LookupResultType extends SingleNodeLookupResult,
  DataExtractorReturnType,
  DefaultValueType extends DataExtractorReturnType | undefined,
> = DependentOfDefaultValue<
  DependentOfNodeLookupResult<LookupResultType, DataExtractorReturnType>,
  DefaultValueType
>;

export interface SingleNodeBindingBuilder<
  LookupResultType extends SingleNodeLookupResult,
  DataExtractorReturnType,
  DefaultValueType extends DataExtractorReturnType | undefined = undefined,
> extends SingleNodeDataExtractorFnFactory<
    DependentOfNodeLookupResultAndDefaultValue<
      LookupResultType,
      DataExtractorReturnType,
      DefaultValueType
    >
  > {
  withDefault<
    GivenDefaultValueType extends DataExtractorReturnType | undefined,
  >(
    defaultValue: GivenDefaultValueType
  ): SingleNodeBindingBuilder<
    LookupResultType,
    DataExtractorReturnType,
    GivenDefaultValueType
  >;

  named(
    name: string
  ): SingleNodeBindingBuilder<
    LookupResultType,
    DataExtractorReturnType,
    DefaultValueType
  >;
}
