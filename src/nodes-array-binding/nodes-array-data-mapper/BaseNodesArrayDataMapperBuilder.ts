import { BaseNodesArrayBindingBuilder } from "../BaseNodesArrayBindingBuilder";
import type { NodesArrayBindingBuilder } from "../NodesArrayBindingBuilder";
import type { NodesArrayLookupBuilder } from "../NodesArrayLookupBuilder";
import type { NodesArrayLookupResult } from "../NodesArrayLookupFn";
import type { ObjectBlueprint } from "../../ObjectBlueprint";
import {
  BooleanExtractorFactory,
  NumberExtractorFactory,
  ObjectExtractorFactory,
  type RecursiveObjectFactoryScope,
  StringExtractorFactory,
  RecursiveObjectExtractorFactory,
  type RecursiveObjectFactory,
  type SingleNodeDataExtractorFn,
  type SingleNodeDataExtractorFnFactory,
} from "../../single-node-binding";
import { NodesArrayDataMapper } from "./NodesArrayDataMapper";
import type { NodesArrayDataMapperBuilder } from "../NodesArrayDataMapperBuilder";

export class BaseNodesArrayDataMapperBuilder<
  ArrayLookupResult extends NodesArrayLookupResult,
> implements NodesArrayDataMapperBuilder<ArrayLookupResult>
{
  constructor(
    private readonly lookupBuilder: NodesArrayLookupBuilder<ArrayLookupResult>
  ) {}

  ofBooleans(): NodesArrayBindingBuilder<ArrayLookupResult, boolean[]> {
    return new BaseNodesArrayBindingBuilder(
      this.lookupBuilder,
      new NodesArrayDataMapper(new BooleanExtractorFactory())
    );
  }

  ofNumbers(): NodesArrayBindingBuilder<ArrayLookupResult, number[]> {
    return new BaseNodesArrayBindingBuilder(
      this.lookupBuilder,
      new NodesArrayDataMapper(new NumberExtractorFactory())
    );
  }

  ofObjects<ObjectType extends object>(
    blueprint: ObjectBlueprint<ObjectType>
  ): NodesArrayBindingBuilder<ArrayLookupResult, ObjectType[]> {
    return new BaseNodesArrayBindingBuilder(
      this.lookupBuilder,
      new NodesArrayDataMapper(new ObjectExtractorFactory(blueprint))
    );
  }

  ofStrings(): NodesArrayBindingBuilder<ArrayLookupResult, string[]> {
    return new BaseNodesArrayBindingBuilder(
      this.lookupBuilder,
      new NodesArrayDataMapper(new StringExtractorFactory())
    );
  }

  ofRecursiveObjects<RecursiveObjectType extends object>(
    factoryOrScope:
      | RecursiveObjectFactory<RecursiveObjectType>
      | RecursiveObjectFactoryScope<RecursiveObjectType>
  ): NodesArrayBindingBuilder<ArrayLookupResult, RecursiveObjectType[]> {
    return new BaseNodesArrayBindingBuilder(
      this.lookupBuilder,
      new NodesArrayDataMapper(
        new RecursiveObjectExtractorFactory(factoryOrScope)
      )
    );
  }

  usingMapper<MappingFunctionReturnType>(
    cb:
      | SingleNodeDataExtractorFn<MappingFunctionReturnType>
      | SingleNodeDataExtractorFnFactory<MappingFunctionReturnType>
  ): NodesArrayBindingBuilder<
    ArrayLookupResult,
    NonNullable<MappingFunctionReturnType>[]
  > {
    return new BaseNodesArrayBindingBuilder(
      this.lookupBuilder,
      new NodesArrayDataMapper(cb)
    ) as NodesArrayBindingBuilder<
      ArrayLookupResult,
      NonNullable<MappingFunctionReturnType>[]
    >;
  }
}
