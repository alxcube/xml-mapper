import {
  BaseLookupToDataExtractorBindingBuilder,
  type DataExtractorFactoryTypeDependentOfLookupResult,
} from "../../BaseLookupToDataExtractorBindingBuilder";
import type { LookupToDataExtractorBindingBuilder } from "../../LookupToDataExtractorBindingBuilder";
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

/**
 * Implementation of NodesArrayDataMapperBuilder interface.
 */
export class BaseNodesArrayDataMapperBuilder<
  ArrayLookupResult extends NodesArrayLookupResult,
> implements NodesArrayDataMapperBuilder<ArrayLookupResult>
{
  /**
   * BaseNodesArrayDataMapperBuilder constructor.
   *
   * @param lookupBuilder
   */
  constructor(
    private readonly lookupBuilder: NodesArrayLookupBuilder<ArrayLookupResult>
  ) {}

  /**
   * @inheritDoc
   */
  ofBooleans(): LookupToDataExtractorBindingBuilder<
    ArrayLookupResult,
    boolean[]
  > {
    return new BaseLookupToDataExtractorBindingBuilder(
      this.lookupBuilder,
      new NodesArrayDataMapper(
        new BooleanExtractorFactory()
      ) as unknown as DataExtractorFactoryTypeDependentOfLookupResult<
        ArrayLookupResult,
        boolean[]
      >
    );
  }

  /**
   * @inheritDoc
   */
  ofNumbers(): LookupToDataExtractorBindingBuilder<
    ArrayLookupResult,
    number[]
  > {
    return new BaseLookupToDataExtractorBindingBuilder(
      this.lookupBuilder,
      new NodesArrayDataMapper(
        new NumberExtractorFactory()
      ) as unknown as DataExtractorFactoryTypeDependentOfLookupResult<
        ArrayLookupResult,
        number[]
      >
    );
  }

  /**
   * @inheritDoc
   */
  ofObjects<ObjectType extends object>(
    blueprint: ObjectBlueprint<ObjectType>
  ): LookupToDataExtractorBindingBuilder<ArrayLookupResult, ObjectType[]> {
    return new BaseLookupToDataExtractorBindingBuilder(
      this.lookupBuilder,
      new NodesArrayDataMapper(
        new ObjectExtractorFactory(blueprint)
      ) as unknown as DataExtractorFactoryTypeDependentOfLookupResult<
        ArrayLookupResult,
        ObjectType[]
      >
    );
  }

  /**
   * @inheritDoc
   */
  ofStrings(): LookupToDataExtractorBindingBuilder<
    ArrayLookupResult,
    string[]
  > {
    return new BaseLookupToDataExtractorBindingBuilder(
      this.lookupBuilder,
      new NodesArrayDataMapper(
        new StringExtractorFactory()
      ) as unknown as DataExtractorFactoryTypeDependentOfLookupResult<
        ArrayLookupResult,
        string[]
      >
    );
  }

  /**
   * @inheritDoc
   */
  ofRecursiveObjects<RecursiveObjectType extends object>(
    factoryOrScope:
      | RecursiveObjectFactory<RecursiveObjectType>
      | RecursiveObjectFactoryScope<RecursiveObjectType>
  ): LookupToDataExtractorBindingBuilder<
    ArrayLookupResult,
    RecursiveObjectType[]
  > {
    return new BaseLookupToDataExtractorBindingBuilder(
      this.lookupBuilder,
      new NodesArrayDataMapper(
        new RecursiveObjectExtractorFactory(factoryOrScope)
      ) as unknown as DataExtractorFactoryTypeDependentOfLookupResult<
        ArrayLookupResult,
        RecursiveObjectType[]
      >
    );
  }

  /**
   * @inheritDoc
   */
  usingMapper<MappingFunctionReturnType>(
    cb:
      | SingleNodeDataExtractorFn<MappingFunctionReturnType>
      | SingleNodeDataExtractorFnFactory<MappingFunctionReturnType>
  ): LookupToDataExtractorBindingBuilder<
    ArrayLookupResult,
    NonNullable<MappingFunctionReturnType>[]
  > {
    return new BaseLookupToDataExtractorBindingBuilder(
      this.lookupBuilder,
      new NodesArrayDataMapper(
        cb
      ) as unknown as DataExtractorFactoryTypeDependentOfLookupResult<
        ArrayLookupResult,
        NonNullable<MappingFunctionReturnType>[]
      >
    );
  }
}
