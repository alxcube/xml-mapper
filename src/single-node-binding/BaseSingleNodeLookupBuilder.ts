import { isNodeLike, type XPathSelect } from "xpath";
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
  buildNodeLookup(): SingleNodeLookupFn<NodeLookupResult> {
    const isMandatory = this.isMandatory;
    const path = this.path;

    return (contextNode: Node, xpathSelect: XPathSelect): NodeLookupResult => {
      const result = xpathSelect(path, contextNode, true);
      if (result === undefined || result === null) {
        if (isMandatory) {
          throw new RangeError(`Mandatory node was not found by path: ${path}`);
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
      true,
      this.mappingName
    ) as SingleNodeLookupBuilder<NonNullable<NodeLookupResult>>;
  }

  /**
   * @inheritDoc
   */
  optional(): SingleNodeLookupBuilder<NodeLookupResult | undefined> {
    return new BaseSingleNodeLookupBuilder(
      this.path,
      false,
      this.mappingName
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
      >,
      undefined,
      undefined,
      this.mappingName
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
      >,
      undefined,
      undefined,
      this.mappingName
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
      >,
      undefined,
      undefined,
      this.mappingName
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
      >,
      undefined,
      undefined,
      this.mappingName
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
      >,
      undefined,
      undefined,
      this.mappingName
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
      >,
      undefined,
      undefined,
      this.mappingName
    );
  }
}
