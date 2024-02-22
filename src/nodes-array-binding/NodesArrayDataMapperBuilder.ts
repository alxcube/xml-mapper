import type { NodesArrayBindingBuilder } from "./NodesArrayBindingBuilder";
import type { NodesArrayLookupResult } from "./NodesArrayLookupFn";
import type { ObjectBlueprint } from "../ObjectBlueprint";
import type {
  RecursiveObjectFactory,
  RecursiveObjectFactoryScope,
  SingleNodeDataExtractorFn,
  SingleNodeDataExtractorFnFactory,
} from "../single-node-binding";

export interface NodesArrayDataMapperBuilder<
  NodesLookupResult extends NodesArrayLookupResult,
> {
  ofStrings(): NodesArrayBindingBuilder<NodesLookupResult, string[]>;

  ofNumbers(): NodesArrayBindingBuilder<NodesLookupResult, number[]>;

  ofBooleans(): NodesArrayBindingBuilder<NodesLookupResult, boolean[]>;

  ofObjects<ObjectType extends object>(
    blueprint: ObjectBlueprint<ObjectType>
  ): NodesArrayBindingBuilder<NodesLookupResult, ObjectType[]>;

  ofRecursiveObjects<RecursiveObjectType extends object>(
    factoryOrScope:
      | RecursiveObjectFactory<RecursiveObjectType>
      | RecursiveObjectFactoryScope<RecursiveObjectType>
  ): NodesArrayBindingBuilder<NodesLookupResult, RecursiveObjectType[]>;

  usingMapper<MappingFunctionReturnType>(
    cb:
      | SingleNodeDataExtractorFn<MappingFunctionReturnType>
      | SingleNodeDataExtractorFnFactory<MappingFunctionReturnType>
  ): NodesArrayBindingBuilder<
    NodesLookupResult,
    NonNullable<MappingFunctionReturnType>[]
  >;
}
