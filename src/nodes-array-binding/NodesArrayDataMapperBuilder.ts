import type { LookupToDataExtractorBindingBuilder } from "../LookupToDataExtractorBindingBuilder";
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
  ofStrings(): LookupToDataExtractorBindingBuilder<NodesLookupResult, string[]>;

  ofNumbers(): LookupToDataExtractorBindingBuilder<NodesLookupResult, number[]>;

  ofBooleans(): LookupToDataExtractorBindingBuilder<
    NodesLookupResult,
    boolean[]
  >;

  ofObjects<ObjectType extends object>(
    blueprint: ObjectBlueprint<ObjectType>
  ): LookupToDataExtractorBindingBuilder<NodesLookupResult, ObjectType[]>;

  ofRecursiveObjects<RecursiveObjectType extends object>(
    factoryOrScope:
      | RecursiveObjectFactory<RecursiveObjectType>
      | RecursiveObjectFactoryScope<RecursiveObjectType>
  ): LookupToDataExtractorBindingBuilder<
    NodesLookupResult,
    RecursiveObjectType[]
  >;

  usingMapper<MappingFunctionReturnType>(
    cb:
      | SingleNodeDataExtractorFn<MappingFunctionReturnType>
      | SingleNodeDataExtractorFnFactory<MappingFunctionReturnType>
  ): LookupToDataExtractorBindingBuilder<
    NodesLookupResult,
    NonNullable<MappingFunctionReturnType>[]
  >;
}
