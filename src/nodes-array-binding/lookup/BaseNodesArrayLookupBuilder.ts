import type { XPathSelect } from "xpath";
import { BaseNodesArrayBindingBuilder } from "../BaseNodesArrayBindingBuilder";
import { CustomArrayDataExtractorFactory } from "../data-extractors/CustomArrayDataExtractorFactory";
import { BaseNodesArrayDataMapperBuilder } from "../nodes-array-data-mapper/BaseNodesArrayDataMapperBuilder";
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

export class BaseNodesArrayLookupBuilder<T extends NodesArrayLookupResult>
  implements NodesArrayLookupBuilder<T>
{
  constructor(
    private readonly factory: NodesArrayLookupFactory<T>,
    private readonly path: string,
    private readonly isMandatory = false
  ) {}

  buildNodesArrayLookup(): NodesArrayLookupFn<T> {
    const isMandatory = this.isMandatory;
    const path = this.path;
    const lookupFn = this.factory.createNodesArrayLookup(path);

    return (contextNode: Node, xpathSelect: XPathSelect): T => {
      const result = lookupFn(contextNode, xpathSelect);
      if (isMandatory && (result === undefined || result === null)) {
        throw new RangeError(
          `Mandatory nodes array was not found by path: ${path}`
        );
      }
      return result;
    };
  }

  mandatory(): NodesArrayLookupBuilder<NonNullable<T>> {
    return new BaseNodesArrayLookupBuilder(
      this.factory,
      this.path,
      true
    ) as NodesArrayLookupBuilder<NonNullable<T>>;
  }

  optional(): NodesArrayLookupBuilder<T | undefined> {
    return new BaseNodesArrayLookupBuilder(
      this.factory,
      this.path,
      false
    ) as NodesArrayLookupBuilder<T | undefined>;
  }

  asArray(): NodesArrayDataMapperBuilder<T> {
    return new BaseNodesArrayDataMapperBuilder(this);
  }

  callback<C>(
    cb: NodesArrayDataExtractorFn<C> | NodesArrayDataExtractorFnFactory<C>
  ): NodesArrayBindingBuilder<T, C> {
    return new BaseNodesArrayBindingBuilder(
      this,
      new CustomArrayDataExtractorFactory(cb)
    );
  }
}
