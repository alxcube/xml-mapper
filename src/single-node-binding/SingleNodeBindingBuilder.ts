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

export type ConversionFn<InputType, OutputType> = (
  input: InputType
) => OutputType;

export type DependentOfConversionFnType<
  DataExtractorReturnType,
  ConversionFnType extends
    | ConversionFn<DataExtractorReturnType, unknown>
    | undefined,
> =
  ConversionFnType extends ConversionFn<
    DataExtractorReturnType,
    infer ConversionFnReturnType
  >
    ? ConversionFnReturnType
    : DataExtractorReturnType;

export type DependentOfLookupResultAndConversionFnAndDefaultValue<
  LookupResult extends SingleNodeLookupResult,
  DataExtractorReturnType,
  ConversionFnType extends
    | ConversionFn<DataExtractorReturnType, unknown>
    | undefined = undefined,
  DefaultValueType extends
    | DependentOfConversionFnType<DataExtractorReturnType, ConversionFnType>
    | undefined = undefined,
> = DependentOfDefaultValue<
  DependentOfNodeLookupResult<
    LookupResult,
    DependentOfConversionFnType<DataExtractorReturnType, ConversionFnType>
  >,
  DefaultValueType
>;
export interface SingleNodeBindingBuilder<
  LookupResult extends SingleNodeLookupResult,
  DataExtractorReturnType,
  ConversionFnType extends
    | ConversionFn<DataExtractorReturnType, unknown>
    | undefined = undefined,
  DefaultValueType extends
    | DependentOfConversionFnType<DataExtractorReturnType, ConversionFnType>
    | undefined = undefined,
> extends SingleNodeDataExtractorFnFactory<
    DependentOfLookupResultAndConversionFnAndDefaultValue<
      LookupResult,
      DataExtractorReturnType,
      ConversionFnType,
      DefaultValueType
    >
  > {
  withDefault<
    GivenDefaultValueType extends
      | DependentOfConversionFnType<DataExtractorReturnType, ConversionFnType>
      | undefined,
  >(
    defaultValue: GivenDefaultValueType
  ): SingleNodeBindingBuilder<
    LookupResult,
    DataExtractorReturnType,
    ConversionFnType,
    GivenDefaultValueType
  >;

  named(
    name: string
  ): SingleNodeBindingBuilder<
    LookupResult,
    DataExtractorReturnType,
    ConversionFnType,
    DefaultValueType
  >;

  withConversion<
    GivenConversionFnType extends ConversionFn<
      DataExtractorReturnType,
      unknown
    >,
  >(
    conversionCallback: GivenConversionFnType
  ): SingleNodeBindingBuilder<
    LookupResult,
    DataExtractorReturnType,
    GivenConversionFnType,
    undefined
  >;
}
