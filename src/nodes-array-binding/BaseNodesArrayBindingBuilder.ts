import type { XPathSelect } from "xpath";
import type {
  DependentOfNodesArrayLookupResultAndDefaultValue,
  NodesArrayBindingBuilder,
} from "./NodesArrayBindingBuilder";
import type { NodesArrayDataExtractorFn } from "./NodesArrayDataExtractorFn";
import type { NodesArrayDataExtractorFnFactory } from "./NodesArrayDataExtractorFnFactory";
import type { NodesArrayLookupBuilder } from "./NodesArrayLookupBuilder";
import type {
  NodesArrayLookupFn,
  NodesArrayLookupResult,
} from "./NodesArrayLookupFn";
import type { SingleNodeDataExtractorFn } from "../single-node-binding";

export class BaseNodesArrayBindingBuilder<
  ArrayLookupResult extends NodesArrayLookupResult,
  ArrayDataExtractorReturnType,
  DefaultValueType extends ArrayDataExtractorReturnType | undefined = undefined,
> implements
    NodesArrayBindingBuilder<
      ArrayLookupResult,
      ArrayDataExtractorReturnType,
      DefaultValueType
    >
{
  constructor(
    private readonly lookupBuilder: NodesArrayLookupBuilder<ArrayLookupResult>,
    private readonly dataExtractorFactory: NodesArrayDataExtractorFnFactory<ArrayDataExtractorReturnType>,
    private readonly defaultValue?: DefaultValueType,
    private readonly name = ""
  ) {}

  createNodeDataExtractor(): SingleNodeDataExtractorFn<
    DependentOfNodesArrayLookupResultAndDefaultValue<
      ArrayLookupResult,
      ArrayDataExtractorReturnType,
      DefaultValueType
    >
  > {
    const name = this.name;
    const defaultValue = this.defaultValue;

    let lookupFn: NodesArrayLookupFn<ArrayLookupResult>;
    try {
      lookupFn = this.lookupBuilder.buildNodesArrayLookup();
    } catch (e) {
      throw new Error(`Error in ${name} binding array lookup builder: ${e}`);
    }

    let dataExtractor: NodesArrayDataExtractorFn<ArrayDataExtractorReturnType>;
    try {
      dataExtractor = this.dataExtractorFactory.createNodesArrayDataExtractor();
    } catch (e) {
      throw new Error(
        `Error in ${name} binding array data extractor factory: ${e}`
      );
    }

    return (
      node: Node,
      xpathSelect: XPathSelect
    ): DependentOfNodesArrayLookupResultAndDefaultValue<
      ArrayLookupResult,
      ArrayDataExtractorReturnType,
      DefaultValueType
    > => {
      let lookupResult: ArrayLookupResult;
      try {
        lookupResult = lookupFn(node, xpathSelect);
        if (!lookupResult) {
          return defaultValue as DependentOfNodesArrayLookupResultAndDefaultValue<
            ArrayLookupResult,
            ArrayDataExtractorReturnType,
            DefaultValueType
          >;
        }
      } catch (e) {
        throw new Error(`Error in ${name} binding array lookup: ${e}`);
      }

      let extractedValue: ArrayDataExtractorReturnType;
      try {
        extractedValue = dataExtractor(lookupResult, xpathSelect);
      } catch (e) {
        throw new Error(`Error in ${name} binding array data extractor: ${e}`);
      }

      return (
        extractedValue === undefined ? defaultValue : extractedValue
      ) as DependentOfNodesArrayLookupResultAndDefaultValue<
        ArrayLookupResult,
        ArrayDataExtractorReturnType,
        DefaultValueType
      >;
    };
  }

  named(
    name: string
  ): NodesArrayBindingBuilder<
    ArrayLookupResult,
    ArrayDataExtractorReturnType,
    DefaultValueType
  > {
    return new BaseNodesArrayBindingBuilder(
      this.lookupBuilder,
      this.dataExtractorFactory,
      this.defaultValue,
      name
    );
  }

  withDefault<
    GivenDefaultValueType extends ArrayDataExtractorReturnType | undefined,
  >(
    defaultValue: GivenDefaultValueType
  ): NodesArrayBindingBuilder<
    ArrayLookupResult,
    ArrayDataExtractorReturnType,
    GivenDefaultValueType
  > {
    return new BaseNodesArrayBindingBuilder(
      this.lookupBuilder,
      this.dataExtractorFactory,
      defaultValue,
      this.name
    );
  }
}
