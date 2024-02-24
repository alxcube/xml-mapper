import type { XPathSelect } from "xpath";
import {
  BaseLookupToDataExtractorBindingBuilder,
  type DataExtractorFactoryTypeDependentOfLookupResult,
} from "../../BaseLookupToDataExtractorBindingBuilder";
import type { LookupToDataExtractorBindingBuilder } from "../../LookupToDataExtractorBindingBuilder";
import type { ObjectBlueprint } from "../../ObjectBlueprint";
import {
  BooleanExtractorFactory,
  CustomDataExtractorFactory,
  NumberExtractorFactory,
  ObjectExtractorFactory,
  type RecursiveObjectFactoryScope,
  StringExtractorFactory,
  RecursiveObjectExtractorFactory,
  type RecursiveObjectFactory,
} from "../data-extractors";
import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "../SingleNodeDataExtractorFnFactory";
import type { SingleNodeLookupBuilder } from "../SingleNodeLookupBuilder";
import type {
  SingleNodeLookupFn,
  SingleNodeLookupResult,
} from "../SingleNodeLookupFn";
import type { SingleNodeLookupFactory } from "../SingleNodeLookupFactory";

export class BaseSingleNodeLookupBuilder<
  NodeLookupResult extends SingleNodeLookupResult,
> implements SingleNodeLookupBuilder<NodeLookupResult>
{
  constructor(
    private readonly factory: SingleNodeLookupFactory<NodeLookupResult>,
    private readonly path: string,
    private readonly isMandatory = false
  ) {}

  buildNodeLookup(): SingleNodeLookupFn<NodeLookupResult> {
    const isMandatory = this.isMandatory;
    const path = this.path;
    const lookupFn = this.factory.createSingleNodeLookup(path);

    return (contextNode: Node, xpathSelect: XPathSelect): NodeLookupResult => {
      const result = lookupFn(contextNode, xpathSelect);
      if (isMandatory && (result === undefined || result === null)) {
        throw new RangeError(`Mandatory node was not found by path: ${path}`);
      }
      return result;
    };
  }

  mandatory(): SingleNodeLookupBuilder<NonNullable<NodeLookupResult>> {
    return new BaseSingleNodeLookupBuilder(
      this.factory,
      this.path,
      true
    ) as SingleNodeLookupBuilder<NonNullable<NodeLookupResult>>;
  }

  optional(): SingleNodeLookupBuilder<NodeLookupResult | undefined> {
    return new BaseSingleNodeLookupBuilder(
      this.factory,
      this.path,
      false
    ) as SingleNodeLookupBuilder<NodeLookupResult | undefined>;
  }

  asString(): LookupToDataExtractorBindingBuilder<NodeLookupResult, string> {
    return new BaseLookupToDataExtractorBindingBuilder(
      this as SingleNodeLookupBuilder<NodeLookupResult>,
      new StringExtractorFactory() as DataExtractorFactoryTypeDependentOfLookupResult<
        NodeLookupResult,
        string
      >
    );
  }

  asNumber(): LookupToDataExtractorBindingBuilder<NodeLookupResult, number> {
    return new BaseLookupToDataExtractorBindingBuilder(
      this,
      new NumberExtractorFactory() as DataExtractorFactoryTypeDependentOfLookupResult<
        NodeLookupResult,
        number
      >
    );
  }

  asBoolean(): LookupToDataExtractorBindingBuilder<NodeLookupResult, boolean> {
    return new BaseLookupToDataExtractorBindingBuilder(
      this,
      new BooleanExtractorFactory() as DataExtractorFactoryTypeDependentOfLookupResult<
        NodeLookupResult,
        boolean
      >
    );
  }

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
}
