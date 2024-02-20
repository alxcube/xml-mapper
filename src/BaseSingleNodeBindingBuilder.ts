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
  L extends SingleNodeLookupResult,
  T,
  D extends T | undefined = undefined,
> implements SingleNodeBindingBuilder<L, T, D>
{
  constructor(
    private readonly lookupBuilder: SingleNodeLookupBuilder<L>,
    private readonly dataExtractorFactory: SingleNodeDataExtractorFnFactory<T>,
    private readonly defaultValue?: D,
    private readonly name = ""
  ) {}
  createNodeDataExtractor(): SingleNodeDataExtractorFn<
    DependentOfNodeLookupResultAndDefaultValue<L, T, D>
  > {
    const name = this.name;
    const defaultValue = this.defaultValue;

    let lookupFn: SingleNodeLookupFn<L>;
    try {
      lookupFn = this.lookupBuilder.buildNodeLookup();
    } catch (e) {
      throw new Error(`Error in ${name} binding lookup builder: ${e}`);
    }

    let dataExtractor: SingleNodeDataExtractorFn<T>;
    try {
      dataExtractor = this.dataExtractorFactory.createNodeDataExtractor();
    } catch (e) {
      throw new Error(`Error in ${name} binding data extractor factory: ${e}`);
    }

    return (
      node: Node,
      xpathSelect: XPathSelect
    ): DependentOfNodeLookupResultAndDefaultValue<L, T, D> => {
      let lookupResult: L;
      try {
        lookupResult = lookupFn(node, xpathSelect);
        if (!lookupResult) {
          return defaultValue as DependentOfNodeLookupResultAndDefaultValue<
            L,
            T,
            D
          >;
        }
      } catch (e) {
        throw new Error(`Error in ${name} binding lookup: ${e}`);
      }

      let extractedValue: T;
      try {
        extractedValue = dataExtractor(lookupResult, xpathSelect);
      } catch (e) {
        throw new Error(`Error in ${name} binding data extractor: ${e}`);
      }

      return (
        extractedValue === undefined ? defaultValue : extractedValue
      ) as DependentOfNodeLookupResultAndDefaultValue<L, T, D>;
    };
  }

  named(name: string): SingleNodeBindingBuilder<L, T, D> {
    return new BaseSingleNodeBindingBuilder(
      this.lookupBuilder,
      this.dataExtractorFactory,
      this.defaultValue,
      name
    );
  }

  withDefault<DT extends T | undefined>(
    defaultValue: DT
  ): SingleNodeBindingBuilder<L, T, DT> {
    return new BaseSingleNodeBindingBuilder(
      this.lookupBuilder,
      this.dataExtractorFactory,
      defaultValue,
      this.name
    );
  }
}
