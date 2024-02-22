import type { XPathSelect } from "xpath";
import type {
  DependentOfNodeLookupResultAndDefaultValue,
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
  NodeLookupResultType extends SingleNodeLookupResult,
  DataExtractorReturnType,
  DefaultValueType extends DataExtractorReturnType | undefined = undefined,
> implements
    SingleNodeBindingBuilder<
      NodeLookupResultType,
      DataExtractorReturnType,
      DefaultValueType
    >
{
  constructor(
    private readonly lookupBuilder: SingleNodeLookupBuilder<NodeLookupResultType>,
    private readonly dataExtractorFactory: SingleNodeDataExtractorFnFactory<DataExtractorReturnType>,
    private readonly defaultValue?: DefaultValueType,
    private readonly name = ""
  ) {}
  createNodeDataExtractor(): SingleNodeDataExtractorFn<
    DependentOfNodeLookupResultAndDefaultValue<
      NodeLookupResultType,
      DataExtractorReturnType,
      DefaultValueType
    >
  > {
    const name = this.name;
    const defaultValue = this.defaultValue;

    let lookupFn: SingleNodeLookupFn<NodeLookupResultType>;
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

    return (
      node: Node,
      xpathSelect: XPathSelect
    ): DependentOfNodeLookupResultAndDefaultValue<
      NodeLookupResultType,
      DataExtractorReturnType,
      DefaultValueType
    > => {
      let lookupResult: NodeLookupResultType;
      try {
        lookupResult = lookupFn(node, xpathSelect);
        if (!lookupResult) {
          return defaultValue as DependentOfNodeLookupResultAndDefaultValue<
            NodeLookupResultType,
            DataExtractorReturnType,
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

      return (
        extractedValue === undefined ? defaultValue : extractedValue
      ) as DependentOfNodeLookupResultAndDefaultValue<
        NodeLookupResultType,
        DataExtractorReturnType,
        DefaultValueType
      >;
    };
  }

  named(
    name: string
  ): SingleNodeBindingBuilder<
    NodeLookupResultType,
    DataExtractorReturnType,
    DefaultValueType
  > {
    return new BaseSingleNodeBindingBuilder(
      this.lookupBuilder,
      this.dataExtractorFactory,
      this.defaultValue,
      name
    );
  }

  withDefault<
    GivenDefaultValueType extends DataExtractorReturnType | undefined,
  >(
    defaultValue: GivenDefaultValueType
  ): SingleNodeBindingBuilder<
    NodeLookupResultType,
    DataExtractorReturnType,
    GivenDefaultValueType
  > {
    return new BaseSingleNodeBindingBuilder(
      this.lookupBuilder,
      this.dataExtractorFactory,
      defaultValue,
      this.name
    );
  }
}
