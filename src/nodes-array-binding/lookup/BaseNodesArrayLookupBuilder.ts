import type { XPathSelect } from "xpath";
import {
  BaseLookupToDataExtractorBindingBuilder,
  type DataExtractorFactoryTypeDependentOfLookupResult,
} from "../../BaseLookupToDataExtractorBindingBuilder";
import type { LookupToDataExtractorBindingBuilder } from "../../LookupToDataExtractorBindingBuilder";
import { CustomArrayDataExtractorFactory } from "../data-extractors";
import { BaseNodesArrayDataMapperBuilder } from "../nodes-array-data-mapper";
import type { NodesArrayDataMapperBuilder } from "../NodesArrayDataMapperBuilder";
import type { NodesArrayDataExtractorFn } from "../NodesArrayDataExtractorFn";
import type { NodesArrayDataExtractorFnFactory } from "../NodesArrayDataExtractorFnFactory";
import type { NodesArrayLookupBuilder } from "../NodesArrayLookupBuilder";
import type {
  NodesArrayLookupFn,
  NodesArrayLookupResult,
} from "../NodesArrayLookupFn";
import type { NodesArrayLookupFactory } from "../NodesArrayLookupFactory";

/**
 * Implementation of NodesArrayLookupBuilder interface.
 */
export class BaseNodesArrayLookupBuilder<
  ArrayLookupResult extends NodesArrayLookupResult,
> implements NodesArrayLookupBuilder<ArrayLookupResult>
{
  /**
   * BaseNodesArrayLookupBuilder constructor.
   *
   * @param factory
   * @param path
   * @param isMandatory
   */
  constructor(
    private readonly factory: NodesArrayLookupFactory<ArrayLookupResult>,
    private readonly path: string,
    private readonly isMandatory = false
  ) {}

  /**
   * @inheritDoc
   */
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

  /**
   * @inheritDoc
   */
  mandatory(): NodesArrayLookupBuilder<NonNullable<ArrayLookupResult>> {
    return new BaseNodesArrayLookupBuilder(
      this.factory,
      this.path,
      true
    ) as NodesArrayLookupBuilder<NonNullable<ArrayLookupResult>>;
  }

  /**
   * @inheritDoc
   */
  optional(): NodesArrayLookupBuilder<ArrayLookupResult | undefined> {
    return new BaseNodesArrayLookupBuilder(
      this.factory,
      this.path,
      false
    ) as NodesArrayLookupBuilder<ArrayLookupResult | undefined>;
  }

  /**
   * @inheritDoc
   */
  asArray(): NodesArrayDataMapperBuilder<ArrayLookupResult> {
    return new BaseNodesArrayDataMapperBuilder(this);
  }

  /**
   * @inheritDoc
   */
  callback<CallbackReturnType>(
    cb:
      | NodesArrayDataExtractorFn<CallbackReturnType>
      | NodesArrayDataExtractorFnFactory<CallbackReturnType>
  ): LookupToDataExtractorBindingBuilder<
    ArrayLookupResult,
    CallbackReturnType
  > {
    return new BaseLookupToDataExtractorBindingBuilder(
      this,
      new CustomArrayDataExtractorFactory(
        cb
      ) as unknown as DataExtractorFactoryTypeDependentOfLookupResult<
        ArrayLookupResult,
        CallbackReturnType
      >
    );
  }
}
