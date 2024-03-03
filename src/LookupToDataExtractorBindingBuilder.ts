import type { SingleNodeDataExtractorFnFactory } from "./single-node-binding";

/**
 * Lookup result of reference nodes - single node or array of nodes.
 */
export type LookupResult = Node | Node[] | undefined;

/**
 * Utility type. Returns DependentType when LookupResultType is non-nullable, and DependentType | undefined, when
 * LookupResultType may be undefined.
 *
 * @example
 * DependentOfLookupResult<Node, string> ---> string;
 * DependentOfLookupResult<Node | undefined, string> ---> string | undefined;
 */
export type DependentOfLookupResult<
  LookupResultType extends LookupResult,
  DependentType,
> = LookupResultType extends undefined
  ? DependentType | undefined
  : DependentType;

/**
 * UtilityType. Returns NonNullable<MainType> | DefaultValue type, when MainType extends undefined; returns MainType,
 * when MainType is non-nullable.
 *
 * @example
 * DependentOfDefaultValueType<Node | undefined, Element> ---> Node | Element;
 * DependentOfDefaultValueType<Node, Element> ---> Node;
 * DependentOfDefaultValueType<Node | undefined, Element | undefined> ---> Node | Element | undefined;
 */
export type DependentOfDefaultValueType<
  MainType,
  DefaultValueType extends MainType | undefined,
> = MainType extends undefined
  ? Exclude<NonNullable<MainType> | DefaultValueType, never | never[]>
  : MainType;

/**
 * UtilityType. Returns ConvertedType, unless it is 'never'. Returns SourceType, when ConvertedType is 'never'.
 *
 * @example
 * DependentOfConvertedType<never, string> ---> string;
 * DependentOfConvertedType<number, string> ---> number;
 */
export type DependentOfConvertedType<
  ConvertedType extends unknown | never,
  SourceType,
> = [ConvertedType] extends [never] ? SourceType : ConvertedType;

/**
 * Utility type. Returns type, dependent of node lookup result, converted value type, default value type.
 *
 * @example
 * DependentOfLookupResultAndConvertedTypeAndDefaultValueType<Node, string> ---> string;
 * DependentOfLookupResultAndConvertedTypeAndDefaultValueType<Node | undefined, string> ---> string | undefined;
 * DependentOfLookupResultAndConvertedTypeAndDefaultValueType<Node, string, number> ---> number;
 * DependentOfLookupResultAndConvertedTypeAndDefaultValueType<Node | undefined, string, number > ---> number | undefined;
 * DependentOfLookupResultAndConvertedTypeAndDefaultValueType<Node | undefined, string, never, string> ---> string;
 * DependentOfLookupResultAndConvertedTypeAndDefaultValueType<Node | undefined, string, number, number> ---> number;
 */
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

/**
 * Conversion function. Takes input and converts it to other type.
 */
export type ConversionFn<InputType, OutputType> = (
  input: InputType
) => OutputType;

/**
 * Creates binding of lookup function to data extractor function.
 */
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
  /**
   * Sets default value type. Default value type extends data extractor function return type, unless conversion callback
   * is set. When set conversion callback, default value should be of its returned type.
   *
   * @param defaultValue
   */
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

  /**
   * Sets conversion callback, which will be called with data extraction result (only when it is not undefined).
   *
   * @param conversionCallback
   */
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
