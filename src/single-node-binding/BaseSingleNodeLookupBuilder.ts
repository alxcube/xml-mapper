import { isNodeLike, type SelectedValue, type XPathSelect } from "xpath";
import {
  BaseLookupToDataExtractorBindingBuilder,
  type DataExtractorFactoryTypeDependentOfLookupResult,
} from "../BaseLookupToDataExtractorBindingBuilder";
import type { LookupToDataExtractorBindingBuilder } from "../LookupToDataExtractorBindingBuilder";
import type { ObjectBlueprint } from "../ObjectBlueprint";
import { getTypeName } from "../utils";
import {
  BooleanExtractorFactory,
  CustomDataExtractorFactory,
  NumberExtractorFactory,
  ObjectExtractorFactory,
  type RecursiveObjectFactoryScope,
  StringExtractorFactory,
  RecursiveObjectExtractorFactory,
  type RecursiveObjectFactory,
} from "./data-extractors";
import type { SingleNodeDataExtractorFn } from "./SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "./SingleNodeDataExtractorFnFactory";
import type { SingleNodeLookupBuilder } from "./SingleNodeLookupBuilder";
import type {
  SingleNodeLookupFn,
  SingleNodeLookupResult,
} from "./SingleNodeLookupFn";

/**
 * Implementation of SingleNodeLookupBuilder interface.
 */
export class BaseSingleNodeLookupBuilder<
  NodeLookupResult extends SingleNodeLookupResult,
> implements SingleNodeLookupBuilder<NodeLookupResult>
{
  /**
   * BaseSingleNodeLookupBuilder constructor.
   *
   * @param path
   * @param isMandatory
   */
  constructor(
    private readonly path: string,
    private readonly isMandatory = false
  ) {}

  /**
   * @inheritDoc
   */
  buildNodeLookup(): SingleNodeLookupFn<NodeLookupResult> {
    const isMandatory = this.isMandatory;
    const path = this.path;

    return (contextNode: Node, xpathSelect: XPathSelect): NodeLookupResult => {
      let result: SelectedValue;
      try {
        result = xpathSelect(path, contextNode, true);
      } catch (e) {
        throw new Error(`Error in node lookup: ${e}. Lookup path: "${path}"`);
      }

      if (result === undefined || result === null) {
        if (isMandatory) {
          throw new RangeError(
            `Mandatory node is not found. Lookup path: "${path}".`
          );
        }
        return undefined as NodeLookupResult;
      }

      if (!isNodeLike(result)) {
        throw new TypeError(
          `Unexpected lookup result. Expected Node, but got ${getTypeName(result)}. Lookup path: "${path}"`
        );
      }

      return result as NodeLookupResult;
    };
  }

  /**
   * @inheritDoc
   */
  mandatory(): SingleNodeLookupBuilder<NonNullable<NodeLookupResult>> {
    return new BaseSingleNodeLookupBuilder(
      this.path,
      true
    ) as SingleNodeLookupBuilder<NonNullable<NodeLookupResult>>;
  }

  /**
   * @inheritDoc
   */
  optional(): SingleNodeLookupBuilder<NodeLookupResult | undefined> {
    return new BaseSingleNodeLookupBuilder(
      this.path,
      false
    ) as SingleNodeLookupBuilder<NodeLookupResult | undefined>;
  }

  /**
   * @inheritDoc
   */
  asString(): LookupToDataExtractorBindingBuilder<NodeLookupResult, string> {
    return new BaseLookupToDataExtractorBindingBuilder(
      this as SingleNodeLookupBuilder<NodeLookupResult>,
      new StringExtractorFactory() as DataExtractorFactoryTypeDependentOfLookupResult<
        NodeLookupResult,
        string
      >
    );
  }

  /**
   * @inheritDoc
   */
  asNumber(): LookupToDataExtractorBindingBuilder<NodeLookupResult, number> {
    return new BaseLookupToDataExtractorBindingBuilder(
      this,
      new NumberExtractorFactory() as DataExtractorFactoryTypeDependentOfLookupResult<
        NodeLookupResult,
        number
      >
    );
  }

  /**
   * @inheritDoc
   */
  asBoolean(): LookupToDataExtractorBindingBuilder<NodeLookupResult, boolean> {
    return new BaseLookupToDataExtractorBindingBuilder(
      this,
      new BooleanExtractorFactory() as DataExtractorFactoryTypeDependentOfLookupResult<
        NodeLookupResult,
        boolean
      >
    );
  }

  /**
   * @inheritDoc
   */
  asObject<ObjectType extends object>(
    blueprint: ObjectBlueprint<ObjectType>
  ): LookupToDataExtractorBindingBuilder<NodeLookupResult, ObjectType> {
    return new BaseLookupToDataExtractorBindingBuilder(
      this,
      new ObjectExtractorFactory(
        blueprint
      ) as unknown as DataExtractorFactoryTypeDependentOfLookupResult<
        NodeLookupResult,
        ObjectType
      >
    );
  }

  /**
   * @inheritDoc
   */
  asRecursiveObject<RecursiveObjectType extends object>(
    recursiveObjectFactoryOrScope:
      | RecursiveObjectFactory<RecursiveObjectType>
      | RecursiveObjectFactoryScope<RecursiveObjectType>
  ): LookupToDataExtractorBindingBuilder<
    NodeLookupResult,
    RecursiveObjectType
  > {
    return new BaseLookupToDataExtractorBindingBuilder(
      this,
      new RecursiveObjectExtractorFactory(
        recursiveObjectFactoryOrScope
      ) as unknown as DataExtractorFactoryTypeDependentOfLookupResult<
        NodeLookupResult,
        RecursiveObjectType
      >
    );
  }

  /**
   * @inheritDoc
   */
  callback<CallbackReturnType>(
    cb:
      | SingleNodeDataExtractorFn<CallbackReturnType>
      | SingleNodeDataExtractorFnFactory<CallbackReturnType>
  ): LookupToDataExtractorBindingBuilder<NodeLookupResult, CallbackReturnType> {
    return new BaseLookupToDataExtractorBindingBuilder(
      this,
      new CustomDataExtractorFactory(
        cb
      ) as unknown as DataExtractorFactoryTypeDependentOfLookupResult<
        NodeLookupResult,
        CallbackReturnType
      >
    );
  }

  /**
   * @inheritDoc
   */
  getPath(): string {
    return this.path;
  }
}
