import type { XPathSelect } from "xpath";
import type {
  ConversionFn,
  DependentOfConvertedType,
  DependentOfLookupResultAndConvertedTypeAndDefaultValueType,
  LookupToDataExtractorBindingBuilder,
} from "./LookupToDataExtractorBindingBuilder";
import {
  isNodesArrayDataExtractorFnFactory,
  isNodesArrayLookupBuilder,
  type NodesArrayDataExtractorFnFactory,
  type NodesArrayLookupBuilder,
} from "./nodes-array-binding";
import {
  isSingleNodeDataExtractorFnFactory,
  isSingleNodeLookupBuilder,
  type SingleNodeDataExtractorFn,
  type SingleNodeDataExtractorFnFactory,
  type SingleNodeLookupBuilder,
} from "./single-node-binding";

export type LookupReturnTypeDependentOfLookupBuilder<
  LookupBuilderType extends
    | SingleNodeLookupBuilder<Node | undefined>
    | NodesArrayLookupBuilder<Node[] | undefined>,
> =
  LookupBuilderType extends SingleNodeLookupBuilder<
    infer SingleNodeLookupReturnType
  >
    ? SingleNodeLookupReturnType
    : LookupBuilderType extends NodesArrayLookupBuilder<
          infer NodesArrayLookupReturnType
        >
      ? NodesArrayLookupReturnType
      : never;

export type DataExtractorFactoryTypeDependentOnLookupResult<
  LookupResult extends Node | Node[] | undefined,
  ReturnType,
> = LookupResult extends Node
  ? SingleNodeDataExtractorFnFactory<ReturnType>
  : LookupResult extends Node[]
    ? NodesArrayDataExtractorFnFactory<ReturnType>
    : never;
export class BaseLookupToDataExtractorBinding<
  LookupBuilderType extends
    | SingleNodeLookupBuilder<Node | undefined>
    | NodesArrayLookupBuilder<Node[] | undefined>,
  LookupReturnType extends
    LookupReturnTypeDependentOfLookupBuilder<LookupBuilderType>,
  DataExtractorReturnType,
  DataExtractorType extends DataExtractorFactoryTypeDependentOnLookupResult<
    LookupReturnType,
    DataExtractorReturnType
  >,
  ConversionFnReturnType extends unknown | never = never,
  DefaultValueType extends
    | DependentOfConvertedType<ConversionFnReturnType, DataExtractorReturnType>
    | undefined = undefined,
> implements
    LookupToDataExtractorBindingBuilder<
      LookupReturnType,
      DataExtractorReturnType,
      ConversionFnReturnType,
      DefaultValueType
    >
{
  constructor(
    private readonly lookupBuilder: LookupBuilderType,
    private readonly extractorFactory: DataExtractorType,
    private readonly conversionFn?: ConversionFn<
      DataExtractorReturnType,
      ConversionFnReturnType
    >,
    private readonly defaultValue?: DefaultValueType,
    private readonly name?: string
  ) {}
  createNodeDataExtractor(): SingleNodeDataExtractorFn<
    DependentOfLookupResultAndConvertedTypeAndDefaultValueType<
      LookupReturnType,
      DataExtractorReturnType,
      ConversionFnReturnType,
      DefaultValueType
    >
  > {
    this.ensureIsValidBinding();

    const name = this.name;
    const defaultValue = this.defaultValue;
    const lookupFn = this.getLookupFn();
    const dataExtractorFn = this.getDataExtractorFn();
    const conversionFn = this.conversionFn;

    return ((node: Node, xpathSelect: XPathSelect) => {
      let lookupResult: LookupReturnType;
      try {
        lookupResult = lookupFn(node, xpathSelect) as LookupReturnType;
        if (!lookupResult) {
          return defaultValue;
        }
      } catch (e) {
        throw new Error(`Error in ${name} binding lookup: ${e}`);
      }

      let extractedResult: DataExtractorReturnType;
      try {
        extractedResult = dataExtractorFn(
          lookupResult as Node & Node[],
          xpathSelect
        );
      } catch (e) {
        throw new Error(`Error in ${name} binding data extractor: ${e}`);
      }

      if (conversionFn) {
        let convertedResult: ConversionFnReturnType;
        try {
          convertedResult = conversionFn(extractedResult);
        } catch (e) {
          throw new Error(`Error in ${name} binding conversion callback: ${e}`);
        }

        return convertedResult === undefined ? defaultValue : convertedResult;
      }

      return extractedResult === undefined ? defaultValue : extractedResult;
    }) as SingleNodeDataExtractorFn<
      DependentOfLookupResultAndConvertedTypeAndDefaultValueType<
        LookupReturnType,
        DataExtractorReturnType,
        ConversionFnReturnType,
        DefaultValueType
      >
    >;
  }

  named(
    name: string
  ): LookupToDataExtractorBindingBuilder<
    LookupReturnType,
    DataExtractorReturnType,
    ConversionFnReturnType,
    DefaultValueType
  > {
    return new BaseLookupToDataExtractorBinding(
      this.lookupBuilder,
      this.extractorFactory,
      this.conversionFn,
      this.defaultValue,
      name
    );
  }

  withConversion<GivenConversionFnReturnType>(
    conversionCallback: ConversionFn<
      DataExtractorReturnType,
      GivenConversionFnReturnType
    >
  ): LookupToDataExtractorBindingBuilder<
    LookupReturnType,
    DataExtractorReturnType,
    GivenConversionFnReturnType
  > {
    return new BaseLookupToDataExtractorBinding(
      this.lookupBuilder,
      this.extractorFactory,
      conversionCallback,
      undefined,
      this.name
    );
  }

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
    LookupReturnType,
    DataExtractorReturnType,
    ConversionFnReturnType,
    GivenDefaultValueType
  > {
    return new BaseLookupToDataExtractorBinding(
      this.lookupBuilder,
      this.extractorFactory,
      this.conversionFn,
      defaultValue,
      this.name
    );
  }

  private getLookupFn() {
    try {
      const lookupBuilder = this.lookupBuilder;
      if (isSingleNodeLookupBuilder(lookupBuilder)) {
        return lookupBuilder.buildNodeLookup();
      }
      return lookupBuilder.buildNodesArrayLookup();
    } catch (e) {
      throw new Error(`Error in ${this.name} binding lookup builder: ${e}`);
    }
  }

  private getDataExtractorFn() {
    try {
      const dataExtractorFactory = this.extractorFactory;
      if (isSingleNodeDataExtractorFnFactory(dataExtractorFactory)) {
        return dataExtractorFactory.createNodeDataExtractor();
      }
      return dataExtractorFactory.createNodesArrayDataExtractor();
    } catch (e) {
      throw new Error(
        `Error in ${this.name} binding data extractor factory: ${e}`
      );
    }
  }

  private ensureIsValidBinding() {
    if (
      (isSingleNodeLookupBuilder(this.lookupBuilder) &&
        isNodesArrayDataExtractorFnFactory(this.extractorFactory)) ||
      (isNodesArrayLookupBuilder(this.lookupBuilder) &&
        isSingleNodeDataExtractorFnFactory(this.extractorFactory))
    ) {
      throw new TypeError(
        `Node(s) lookup and data extractor types mismatch in binding ${this.name}`
      );
    }
  }
}
