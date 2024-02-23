import type { SingleNodeDataExtractorFnFactory } from "./single-node-binding";

export type LookupResult = Node | Node[] | undefined;

export type DependentOfLookupResult<
  LookupResultType extends LookupResult,
  ReturnType,
> = LookupResultType extends undefined ? ReturnType | undefined : ReturnType;

export type DependentOfDefaultValueType<
  ReturnType,
  DefaultValueType extends ReturnType | undefined,
> = ReturnType extends undefined
  ? DefaultValueType extends undefined
    ? ReturnType | DefaultValueType
    : DefaultValueType
  : ReturnType;

export type DependentOfConvertedType<
  ConvertedType extends unknown | never,
  ReturnType,
> = [ConvertedType] extends [never] ? ReturnType : ConvertedType;

export type DependentOfLookupResultAndConvertedTypeAndDefaultValueType<
  LookupResultType extends LookupResult,
  ReturnType,
  ConvertedType extends unknown | never = never,
  DefaultValueType extends
    | DependentOfConvertedType<ConvertedType, ReturnType>
    | undefined = undefined,
> = DependentOfDefaultValueType<
  DependentOfLookupResult<
    LookupResultType,
    DependentOfConvertedType<ConvertedType, ReturnType>
  >,
  DefaultValueType
>;

export type ConversionFn<InputType, OutputType> = (
  input: InputType
) => OutputType;

export interface LookupToDataExtractorBindingBuilder<
  LookupResultType extends LookupResult,
  DataExtractorReturnType,
  ConversionFnReturnType extends unknown | never = never,
  DefaultValueType extends
    | DependentOfConvertedType<ConversionFnReturnType, DataExtractorReturnType>
    | undefined = undefined,
> extends SingleNodeDataExtractorFnFactory<
    DependentOfLookupResultAndConvertedTypeAndDefaultValueType<
      LookupResultType,
      DataExtractorReturnType,
      ConversionFnReturnType,
      DefaultValueType
    >
  > {
  withDefault<
    GivenDefaultValueType extends
      | DependentOfConvertedType<
          ConversionFnReturnType,
          DataExtractorReturnType
        >
      | undefined,
  >(
    defaultValue?: GivenDefaultValueType
  ): LookupToDataExtractorBindingBuilder<
    LookupResultType,
    DataExtractorReturnType,
    ConversionFnReturnType,
    GivenDefaultValueType
  >;

  named(
    name: string
  ): LookupToDataExtractorBindingBuilder<
    LookupResultType,
    DataExtractorReturnType,
    ConversionFnReturnType,
    DefaultValueType
  >;

  withConversion<GivenConversionFnReturnType>(
    conversionCallback: ConversionFn<
      DataExtractorReturnType,
      GivenConversionFnReturnType
    >
  ): LookupToDataExtractorBindingBuilder<
    LookupResultType,
    DataExtractorReturnType,
    GivenConversionFnReturnType
  >;
}
