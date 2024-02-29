import { isArrayOfNodes, type SelectReturnType, type XPathSelect } from "xpath";
import {
  BaseLookupToDataExtractorBindingBuilder,
  type DataExtractorFactoryTypeDependentOfLookupResult,
} from "../BaseLookupToDataExtractorBindingBuilder";
import { LookupError } from "../error";
import type { LookupToDataExtractorBindingBuilder } from "../LookupToDataExtractorBindingBuilder";
import { getTypeName, isArrayLike } from "../utils";
import { CustomArrayDataExtractorFactory } from "./data-extractors";
import { BaseNodesArrayDataMapperBuilder } from "./nodes-array-data-mapper";
import type { NodesArrayDataMapperBuilder } from "./NodesArrayDataMapperBuilder";
import type { NodesArrayDataExtractorFn } from "./NodesArrayDataExtractorFn";
import type { NodesArrayDataExtractorFnFactory } from "./NodesArrayDataExtractorFnFactory";
import type { NodesArrayLookupBuilder } from "./NodesArrayLookupBuilder";
import type {
  NodesArrayLookupFn,
  NodesArrayLookupResult,
} from "./NodesArrayLookupFn";

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
   * @param path
   * @param isMandatory
   * @param mappingName
   */
  constructor(
    private readonly path: string,
    private readonly isMandatory = false,
    private readonly mappingName = ""
  ) {}

  /**
   * @inheritDoc
   */
  buildNodesArrayLookup(): NodesArrayLookupFn<ArrayLookupResult> {
    const isMandatory = this.isMandatory;
    const path = this.path;

    return (contextNode: Node, xpathSelect: XPathSelect): ArrayLookupResult => {
      let result: SelectReturnType;
      try {
        result = xpathSelect(path, contextNode);
      } catch (e) {
        throw new LookupError("Error in nodes array lookup.", e, path);
      }

      if (
        (isArrayLike(result) && !result.length) ||
        result === undefined ||
        result === null
      ) {
        if (isMandatory) {
          throw new LookupError(
            `Mandatory nodes array was not found by path: ${path}`,
            undefined,
            path
          );
        }
        return undefined as ArrayLookupResult;
      }

      if (isArrayOfNodes(result)) {
        return result as ArrayLookupResult;
      }

      let reason: string;
      if (isArrayLike(result)) {
        reason =
          "some or all lookup result array elements are of different type";
      } else {
        reason = `got ${getTypeName(result)}`;
      }

      throw new LookupError(
        `Unexpected lookup result. Expected type Node[], but ${reason}.`,
        undefined,
        path
      );
    };
  }

  /**
   * @inheritDoc
   */
  mandatory(): NodesArrayLookupBuilder<NonNullable<ArrayLookupResult>> {
    return new BaseNodesArrayLookupBuilder(
      this.path,
      true,
      this.mappingName
    ) as NodesArrayLookupBuilder<NonNullable<ArrayLookupResult>>;
  }

  /**
   * @inheritDoc
   */
  optional(): NodesArrayLookupBuilder<ArrayLookupResult | undefined> {
    return new BaseNodesArrayLookupBuilder(
      this.path,
      false,
      this.mappingName
    ) as NodesArrayLookupBuilder<ArrayLookupResult | undefined>;
  }

  /**
   * @inheritDoc
   */
  asArray(): NodesArrayDataMapperBuilder<ArrayLookupResult> {
    return new BaseNodesArrayDataMapperBuilder(this, this.mappingName);
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
      >,
      undefined,
      undefined,
      this.mappingName
    );
  }

  /**
   * @inheritDoc
   */
  getPath(): string {
    return this.path;
  }
}
