import type { XPathSelect } from "xpath";
import { BaseNodesArrayBindingBuilder } from "../BaseNodesArrayBindingBuilder";
import { CustomArrayDataExtractorFactory } from "../data-extractors";
import { BaseNodesArrayDataMapperBuilder } from "../nodes-array-data-mapper";
import type { NodesArrayDataMapperBuilder } from "../NodesArrayDataMapperBuilder";
import type { NodesArrayBindingBuilder } from "../NodesArrayBindingBuilder";
import type { NodesArrayDataExtractorFn } from "../NodesArrayDataExtractorFn";
import type { NodesArrayDataExtractorFnFactory } from "../NodesArrayDataExtractorFnFactory";
import type { NodesArrayLookupBuilder } from "../NodesArrayLookupBuilder";
import type {
  NodesArrayLookupFn,
  NodesArrayLookupResult,
} from "../NodesArrayLookupFn";
import type { NodesArrayLookupFactory } from "../NodesArrayLookupFactory";

export class BaseNodesArrayLookupBuilder<
  ArrayLookupResult extends NodesArrayLookupResult,
> implements NodesArrayLookupBuilder<ArrayLookupResult>
{
  constructor(
    private readonly factory: NodesArrayLookupFactory<ArrayLookupResult>,
    private readonly path: string,
    private readonly isMandatory = false
  ) {}

  buildNodesArrayLookup(): NodesArrayLookupFn<ArrayLookupResult> {
    const isMandatory = this.isMandatory;
    const path = this.path;
    const lookupFn = this.factory.createNodesArrayLookup(path);

    return (contextNode: Node, xpathSelect: XPathSelect): ArrayLookupResult => {
      const result = lookupFn(contextNode, xpathSelect);
      if (isMandatory && (result === undefined || result === null)) {
        throw new RangeError(
          `Mandatory nodes array was not found by path: ${path}`
        );
      }
      return result;
    };
  }

  mandatory(): NodesArrayLookupBuilder<NonNullable<ArrayLookupResult>> {
    return new BaseNodesArrayLookupBuilder(
      this.factory,
      this.path,
      true
    ) as NodesArrayLookupBuilder<NonNullable<ArrayLookupResult>>;
  }

  optional(): NodesArrayLookupBuilder<ArrayLookupResult | undefined> {
    return new BaseNodesArrayLookupBuilder(
      this.factory,
      this.path,
      false
    ) as NodesArrayLookupBuilder<ArrayLookupResult | undefined>;
  }

  asArray(): NodesArrayDataMapperBuilder<ArrayLookupResult> {
    return new BaseNodesArrayDataMapperBuilder(this);
  }

  callback<CallbackReturnType>(
    cb:
      | NodesArrayDataExtractorFn<CallbackReturnType>
      | NodesArrayDataExtractorFnFactory<CallbackReturnType>
  ): NodesArrayBindingBuilder<ArrayLookupResult, CallbackReturnType> {
    return new BaseNodesArrayBindingBuilder(
      this,
      new CustomArrayDataExtractorFactory(cb)
    );
  }
}
