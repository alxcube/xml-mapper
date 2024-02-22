import type { XPathSelect } from "xpath";
import type {
  ConversionFn,
  DependentOfConversionFnType,
  DependentOfLookupResultAndConversionFnAndDefaultValue,
  SingleNodeBindingBuilder,
} from "./SingleNodeBindingBuilder";
import type { SingleNodeDataExtractorFn } from "./SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "./SingleNodeDataExtractorFnFactory";
import type { SingleNodeLookupBuilder } from "./SingleNodeLookupBuilder";
import type {
  SingleNodeLookupFn,
  SingleNodeLookupResult,
} from "./SingleNodeLookupFn";

export class BaseSingleNodeBindingBuilder<
  LookupResult extends SingleNodeLookupResult,
  DataExtractorReturnType,
  ConversionFnType extends
    | ConversionFn<DataExtractorReturnType, unknown>
    | undefined = undefined,
  DefaultValueType extends
    | DependentOfConversionFnType<DataExtractorReturnType, ConversionFnType>
    | undefined = undefined,
> implements
    SingleNodeBindingBuilder<
      LookupResult,
      DataExtractorReturnType,
      ConversionFnType,
      DefaultValueType
    >
{
  constructor(
    private readonly lookupBuilder: SingleNodeLookupBuilder<LookupResult>,
    private readonly dataExtractorFactory: SingleNodeDataExtractorFnFactory<DataExtractorReturnType>,
    private readonly conversionFn?: ConversionFnType,
    private readonly defaultValue?: DefaultValueType,
    private readonly name = ""
  ) {}
  createNodeDataExtractor(): SingleNodeDataExtractorFn<
    DependentOfLookupResultAndConversionFnAndDefaultValue<
      LookupResult,
      DataExtractorReturnType,
      ConversionFnType,
      DefaultValueType
    >
  > {
    const name = this.name;
    const defaultValue = this.defaultValue;

    let lookupFn: SingleNodeLookupFn<LookupResult>;
    try {
      lookupFn = this.lookupBuilder.buildNodeLookup();
    } catch (e) {
      throw new Error(`Error in ${name} binding lookup builder: ${e}`);
    }

    let dataExtractor: SingleNodeDataExtractorFn<DataExtractorReturnType>;
    try {
      dataExtractor = this.dataExtractorFactory.createNodeDataExtractor();
    } catch (e) {
      throw new Error(`Error in ${name} binding data extractor factory: ${e}`);
    }

    const conversionFn = this.conversionFn;

    return (
      node: Node,
      xpathSelect: XPathSelect
    ): DependentOfLookupResultAndConversionFnAndDefaultValue<
      LookupResult,
      DataExtractorReturnType,
      ConversionFnType,
      DefaultValueType
    > => {
      let lookupResult: LookupResult;
      try {
        lookupResult = lookupFn(node, xpathSelect);
        if (!lookupResult) {
          return defaultValue as DependentOfLookupResultAndConversionFnAndDefaultValue<
            LookupResult,
            DataExtractorReturnType,
            ConversionFnType,
            DefaultValueType
          >;
        }
      } catch (e) {
        throw new Error(`Error in ${name} binding lookup: ${e}`);
      }

      let extractedValue: DataExtractorReturnType;
      try {
        extractedValue = dataExtractor(lookupResult, xpathSelect);
      } catch (e) {
        throw new Error(`Error in ${name} binding data extractor: ${e}`);
      }

      if (conversionFn) {
        let convertedValue: ReturnType<NonNullable<ConversionFnType>>;
        try {
          convertedValue = conversionFn(extractedValue) as ReturnType<
            NonNullable<ConversionFnType>
          >;
        } catch (e) {
          throw new Error(`Error in ${name} binding conversion callback: ${e}`);
        }

        return (
          convertedValue === undefined ? defaultValue : convertedValue
        ) as DependentOfLookupResultAndConversionFnAndDefaultValue<
          LookupResult,
          DataExtractorReturnType,
          ConversionFnType,
          DefaultValueType
        >;
      }

      return (
        extractedValue === undefined ? defaultValue : extractedValue
      ) as DependentOfLookupResultAndConversionFnAndDefaultValue<
        LookupResult,
        DataExtractorReturnType,
        ConversionFnType,
        DefaultValueType
      >;
    };
  }

  named(
    name: string
  ): SingleNodeBindingBuilder<
    LookupResult,
    DataExtractorReturnType,
    ConversionFnType,
    DefaultValueType
  > {
    return new BaseSingleNodeBindingBuilder(
      this.lookupBuilder,
      this.dataExtractorFactory,
      this.conversionFn,
      this.defaultValue,
      name
    );
  }

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
  > {
    return new BaseSingleNodeBindingBuilder(
      this.lookupBuilder,
      this.dataExtractorFactory,
      this.conversionFn,
      defaultValue,
      this.name
    );
  }

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
  > {
    return new BaseSingleNodeBindingBuilder(
      this.lookupBuilder,
      this.dataExtractorFactory,
      conversionCallback,
      undefined,
      this.name
    );
  }
}
