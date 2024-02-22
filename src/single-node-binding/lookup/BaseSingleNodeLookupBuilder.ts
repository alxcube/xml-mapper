import type { XPathSelect } from "xpath";
import { BaseSingleNodeBindingBuilder } from "../BaseSingleNodeBindingBuilder";
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
import type { SingleNodeBindingBuilder } from "../SingleNodeBindingBuilder";
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

  asString(): SingleNodeBindingBuilder<NodeLookupResult, string> {
    return new BaseSingleNodeBindingBuilder(this, new StringExtractorFactory());
  }

  asNumber(): SingleNodeBindingBuilder<NodeLookupResult, number> {
    return new BaseSingleNodeBindingBuilder(this, new NumberExtractorFactory());
  }

  asBoolean(): SingleNodeBindingBuilder<NodeLookupResult, boolean> {
    return new BaseSingleNodeBindingBuilder(
      this,
      new BooleanExtractorFactory()
    );
  }

  asObject<ObjectType extends object>(
    blueprint: ObjectBlueprint<ObjectType>
  ): SingleNodeBindingBuilder<NodeLookupResult, ObjectType> {
    return new BaseSingleNodeBindingBuilder(
      this,
      new ObjectExtractorFactory(blueprint)
    );
  }

  asRecursiveObject<RecursiveObjectType extends object>(
    recursiveObjectFactoryOrScope:
      | RecursiveObjectFactory<RecursiveObjectType>
      | RecursiveObjectFactoryScope<RecursiveObjectType>
  ): SingleNodeBindingBuilder<NodeLookupResult, RecursiveObjectType> {
    return new BaseSingleNodeBindingBuilder(
      this,
      new RecursiveObjectExtractorFactory(recursiveObjectFactoryOrScope)
    );
  }

  callback<CallbackReturnType>(
    cb:
      | SingleNodeDataExtractorFn<CallbackReturnType>
      | SingleNodeDataExtractorFnFactory<CallbackReturnType>
  ): SingleNodeBindingBuilder<NodeLookupResult, CallbackReturnType> {
    return new BaseSingleNodeBindingBuilder(
      this,
      new CustomDataExtractorFactory(cb)
    );
  }
}
