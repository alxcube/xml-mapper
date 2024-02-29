import type { XPathSelect } from "xpath";
import { BindingError, MappingError } from "./error";
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

/**
 * Utility type. Returns inferred lookup return type, depending on lookup builder type.
 *
 * @example
 * LookupReturnTypeDependentOfLookupBuilder<SingleNodeLookupBuilder<Node | undefined>> ---> Node | undefined;
 * LookupReturnTypeDependentOfLookupBuilder<SingleNodeLookupBuilder<Element>> ---> Element;
 * LookupReturnTypeDependentOfLookupBuilder<NodesArrayLookupBuilder<Attr[] | undefined>> ---> Attr[] | undefined;
 */
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

/**
 * Utility type. Returns data extractor factory type, depending on node lookup result type -- either
 * SingleNodeDataExtractorFnFactory, or NodesArrayDataExtractorFnFactory.
 *
 * @example
 * DataExtractorFactoryTypeDependentOfLookupResult<Node> ---> SingleNodeDataExtractorFnFactory;
 * DataExtractorFactoryTypeDependentOfLookupResult<Element | undefined> ---> SingleNodeDataExtractorFnFactory;
 * DataExtractorFactoryTypeDependentOfLookupResult<Node[]> ---> NodesArrayDataExtractorFnFactory
 */
export type DataExtractorFactoryTypeDependentOfLookupResult<
  LookupResult extends Node | Node[] | undefined,
  ReturnType,
> = LookupResult extends Node
  ? SingleNodeDataExtractorFnFactory<ReturnType>
  : LookupResult extends Node[]
    ? NodesArrayDataExtractorFnFactory<ReturnType>
    : never;

/**
 * Implementation of LookupToDataExtractorBindingBuilder interface.
 */
export class BaseLookupToDataExtractorBindingBuilder<
  LookupBuilderType extends
    | SingleNodeLookupBuilder<Node | undefined>
    | NodesArrayLookupBuilder<Node[] | undefined>,
  LookupReturnType extends
    LookupReturnTypeDependentOfLookupBuilder<LookupBuilderType>,
  DataExtractorReturnType,
  DataExtractorType extends DataExtractorFactoryTypeDependentOfLookupResult<
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
  /**
   * BaseLookupToDataExtractorBindingBuilder constructor.
   *
   * @param lookupBuilder
   * @param extractorFactory
   * @param conversionFn
   * @param defaultValue
   * @param name
   */
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

  /**
   * @inheritDoc
   */
  createNodeDataExtractor(): SingleNodeDataExtractorFn<
    DependentOfLookupResultAndConvertedTypeAndDefaultValueType<
      LookupReturnType,
      DataExtractorReturnType,
      ConversionFnReturnType,
      DefaultValueType
    >
  > {
    this.ensureIsValidBinding();

    const fullBindingName = this.getBindingName();
    const defaultValue = this.defaultValue;
    const lookupFn = this.getLookupFn();
    const dataExtractorFn = this.getDataExtractorFn();
    const conversionFn = this.conversionFn;

    return ((node: Node, xpathSelect: XPathSelect) => {
      // Get lookup result
      let lookupResult: LookupReturnType;
      try {
        lookupResult = lookupFn(node, xpathSelect) as LookupReturnType;
        if (!lookupResult) {
          // When reference node(s) not found, return default value.
          return defaultValue;
        }
      } catch (e) {
        throw new BindingError(
          `Error in "${fullBindingName}" binding lookup.`,
          fullBindingName,
          e
        );
      }

      // Extract data from reference node(s).
      let extractedResult: DataExtractorReturnType;
      try {
        extractedResult = dataExtractorFn(
          lookupResult as Node & Node[],
          xpathSelect
        );
      } catch (e) {
        const initialErrorMessage = this.getInitialErrorMessage(e);
        if (e instanceof BindingError) {
          const bindingNamePath = `${fullBindingName} > ${e.bindingName}`;
          const message = `Error in binding "${bindingNamePath}": ${initialErrorMessage}`;
          throw new BindingError(message, bindingNamePath, e);
        }
        throw new BindingError(
          `Error in "${fullBindingName}" binding data extractor: ${initialErrorMessage}`,
          fullBindingName,
          e
        );
      }

      if (conversionFn && extractedResult !== undefined) {
        // Convert extracted data, if conversion callback is set and extracted result is not undefined.
        let convertedResult: ConversionFnReturnType;
        try {
          convertedResult = conversionFn(extractedResult);
        } catch (e) {
          throw new BindingError(
            `Error in "${fullBindingName}" binding conversion callback.`,
            fullBindingName,
            e
          );
        }

        // Return converted result or default value, if converted result is undefined.
        return convertedResult === undefined ? defaultValue : convertedResult;
      }

      // Return extracted data, or default value, is extracted data is undefined.
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

  /**
   * @inheritDoc
   */
  named(
    name: string
  ): LookupToDataExtractorBindingBuilder<
    LookupReturnType,
    DataExtractorReturnType,
    ConversionFnReturnType,
    DefaultValueType
  > {
    return new BaseLookupToDataExtractorBindingBuilder(
      this.lookupBuilder,
      this.extractorFactory,
      this.conversionFn,
      this.defaultValue,
      name
    );
  }

  /**
   * @inheritDoc
   */
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
    return new BaseLookupToDataExtractorBindingBuilder(
      this.lookupBuilder,
      this.extractorFactory,
      conversionCallback,
      undefined,
      this.name
    );
  }

  /**
   * @inheritDoc
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
    LookupReturnType,
    DataExtractorReturnType,
    ConversionFnReturnType,
    GivenDefaultValueType
  > {
    return new BaseLookupToDataExtractorBindingBuilder(
      this.lookupBuilder,
      this.extractorFactory,
      this.conversionFn,
      defaultValue,
      this.name
    );
  }

  /**
   * Returns lookup function with error handling.
   * @private
   */
  private getLookupFn() {
    try {
      const lookupBuilder = this.lookupBuilder;
      if (isSingleNodeLookupBuilder(lookupBuilder)) {
        return lookupBuilder.buildNodeLookup();
      }
      return lookupBuilder.buildNodesArrayLookup();
    } catch (e) {
      throw new BindingError(
        `Error in "${this.getBindingName()}" binding lookup builder.`,
        this.getBindingName(),
        e
      );
    }
  }

  /**
   * Returns data extractor function with error handling.
   * @private
   */
  private getDataExtractorFn() {
    try {
      const dataExtractorFactory = this.extractorFactory;
      if (isSingleNodeDataExtractorFnFactory(dataExtractorFactory)) {
        return dataExtractorFactory.createNodeDataExtractor();
      }
      return dataExtractorFactory.createNodesArrayDataExtractor();
    } catch (e) {
      throw new BindingError(
        `Error in "${this.getBindingName()}" binding data extractor factory.`,
        this.getBindingName(),
        e
      );
    }
  }

  /**
   * Checks if lookup builder is compatible with data extractor function factory:
   * single node lookup result must be handled with single node data extractor only, and
   * array of nodes lookup should be handled with nodes array data extractor only.
   * @private
   */
  private ensureIsValidBinding() {
    if (
      (isSingleNodeLookupBuilder(this.lookupBuilder) &&
        isNodesArrayDataExtractorFnFactory(this.extractorFactory)) ||
      (isNodesArrayLookupBuilder(this.lookupBuilder) &&
        isSingleNodeDataExtractorFnFactory(this.extractorFactory))
    ) {
      throw new BindingError(
        `Node(s) lookup and data extractor types mismatch in binding "${this.getBindingName()}".`,
        this.getBindingName()
      );
    }
  }

  /**
   * Returns binding name, containing mapping name and reference node lookup expression.
   *
   * @private
   */
  private getBindingName(): string {
    const name = this.name ? this.name : "Unnamed";
    return `${name}: ${this.lookupBuilder.getPath()}`;
  }

  /**
   * Returns initial error message for error.
   *
   * @param e
   * @private
   */
  private getInitialErrorMessage(e: Error | unknown): string {
    let initialError;
    if (e instanceof MappingError) {
      initialError = e.getInitialCause() || e;
    } else {
      initialError = e;
    }
    return initialError instanceof Error
      ? initialError.message
      : String(initialError);
  }
}
