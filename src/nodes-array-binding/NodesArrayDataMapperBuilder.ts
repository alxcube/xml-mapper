import type { LookupToDataExtractorBindingBuilder } from "../LookupToDataExtractorBindingBuilder";
import type { NodesArrayLookupResult } from "./NodesArrayLookupFn";
import type { ObjectBlueprint } from "../ObjectBlueprint";
import type {
  RecursiveObjectFactory,
  RecursiveObjectFactoryScope,
  SingleNodeDataExtractorFn,
  SingleNodeDataExtractorFnFactory,
} from "../single-node-binding";

/**
 * Builder of array mapper.
 */
export interface NodesArrayDataMapperBuilder<
  NodesLookupResult extends NodesArrayLookupResult,
> {
  /**
   * Creates binding to array of strings.
   */
  ofStrings(): LookupToDataExtractorBindingBuilder<NodesLookupResult, string[]>;

  /**
   * Creates binding to array of numbers.
   */
  ofNumbers(): LookupToDataExtractorBindingBuilder<NodesLookupResult, number[]>;

  /**
   * Creates binding to array of booleans.
   */
  ofBooleans(): LookupToDataExtractorBindingBuilder<
    NodesLookupResult,
    boolean[]
  >;

  /**
   * Creates binding to array of objects.
   *
   * @param blueprint
   */
  ofObjects<ObjectType extends object>(
    blueprint: ObjectBlueprint<ObjectType>
  ): LookupToDataExtractorBindingBuilder<NodesLookupResult, ObjectType[]>;

  /**
   * Creates binding to array of recursive objects.
   *
   * @param factoryOrScope
   */
  ofRecursiveObjects<RecursiveObjectType extends object>(
    factoryOrScope:
      | RecursiveObjectFactory<RecursiveObjectType>
      | RecursiveObjectFactoryScope<RecursiveObjectType>
  ): LookupToDataExtractorBindingBuilder<
    NodesLookupResult,
    RecursiveObjectType[]
  >;

  /**
   * Creates binding, using custom mapping callback or callback factory.
   *
   * @param cb
   */
  usingMapper<MappingFunctionReturnType>(
    cb:
      | SingleNodeDataExtractorFn<MappingFunctionReturnType>
      | SingleNodeDataExtractorFnFactory<MappingFunctionReturnType>
  ): LookupToDataExtractorBindingBuilder<
    NodesLookupResult,
    NonNullable<MappingFunctionReturnType>[]
  >;
}
