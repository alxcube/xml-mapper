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
import type { SingleNodeDataExtractorFn } from "../single-node-binding/SingleNodeDataExtractorFn";

export class BaseNodesArrayBindingBuilder<
  L extends NodesArrayLookupResult,
  T,
  D extends T | undefined = undefined,
> implements NodesArrayBindingBuilder<L, T, D>
{
  constructor(
    private readonly lookupBuilder: NodesArrayLookupBuilder<L>,
    private readonly dataExtractorFactory: NodesArrayDataExtractorFnFactory<T>,
    private readonly defaultValue?: D,
    private readonly name = ""
  ) {}

  createNodeDataExtractor(): SingleNodeDataExtractorFn<
    DependentOfNodesArrayLookupResultAndDefaultValue<L, T, D>
  > {
    const name = this.name;
    const defaultValue = this.defaultValue;

    let lookupFn: NodesArrayLookupFn<L>;
    try {
      lookupFn = this.lookupBuilder.buildNodesArrayLookup();
    } catch (e) {
      throw new Error(`Error in ${name} binding array lookup builder: ${e}`);
    }

    let dataExtractor: NodesArrayDataExtractorFn<T>;
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
    ): DependentOfNodesArrayLookupResultAndDefaultValue<L, T, D> => {
      let lookupResult: L;
      try {
        lookupResult = lookupFn(node, xpathSelect);
        if (!lookupResult) {
          return defaultValue as DependentOfNodesArrayLookupResultAndDefaultValue<
            L,
            T,
            D
          >;
        }
      } catch (e) {
        throw new Error(`Error in ${name} binding array lookup: ${e}`);
      }

      let extractedValue: T;
      try {
        extractedValue = dataExtractor(lookupResult, xpathSelect);
      } catch (e) {
        throw new Error(`Error in ${name} binding array data extractor: ${e}`);
      }

      return (
        extractedValue === undefined ? defaultValue : extractedValue
      ) as DependentOfNodesArrayLookupResultAndDefaultValue<L, T, D>;
    };
  }

  named(name: string): NodesArrayBindingBuilder<L, T, D> {
    return new BaseNodesArrayBindingBuilder(
      this.lookupBuilder,
      this.dataExtractorFactory,
      this.defaultValue,
      name
    );
  }

  withDefault<DT extends T | undefined>(
    defaultValue: DT
  ): NodesArrayBindingBuilder<L, T, DT> {
    return new BaseNodesArrayBindingBuilder(
      this.lookupBuilder,
      this.dataExtractorFactory,
      defaultValue,
      this.name
    );
  }
}
