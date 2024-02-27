import type { LookupToDataExtractorBindingBuilder } from "../LookupToDataExtractorBindingBuilder";
import type { ObjectBlueprint } from "../ObjectBlueprint";
import type {
  RecursiveObjectFactory,
  RecursiveObjectFactoryScope,
} from "./data-extractors";
import type { SingleNodeDataExtractorFn } from "./SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "./SingleNodeDataExtractorFnFactory";
import type {
  SingleNodeLookupFn,
  SingleNodeLookupResult,
} from "./SingleNodeLookupFn";

/**
 * Single node lookup builder.
 */
export interface SingleNodeLookupBuilder<
  LookupResultType extends SingleNodeLookupResult,
> {
  /**
   * Creates node lookup function.
   */
  buildNodeLookup(): SingleNodeLookupFn<LookupResultType>;

  /**
   * Makes lookup result mandatory, which means that if reference node is not found in lookup,
   * Error will be thrown.
   */
  mandatory(): SingleNodeLookupBuilder<NonNullable<LookupResultType>>;

  /**
   * Makes result lookup optional, which means that if reference node is not found in lookup, undefined will be
   * returned.
   */
  optional(): SingleNodeLookupBuilder<LookupResultType | undefined>;

  /**
   * Creates binding to string.
   */
  asString(): LookupToDataExtractorBindingBuilder<LookupResultType, string>;

  /**
   * Creates binding to number.
   */
  asNumber(): LookupToDataExtractorBindingBuilder<LookupResultType, number>;

  /**
   * Creates binding to boolean.
   */
  asBoolean(): LookupToDataExtractorBindingBuilder<LookupResultType, boolean>;

  /**
   * Creates binding to object.
   *
   * @param blueprint
   */
  asObject<ObjectType extends object>(
    blueprint: ObjectBlueprint<ObjectType>
  ): LookupToDataExtractorBindingBuilder<LookupResultType, ObjectType>;

  /**
   * Creates binding to recursive object.
   *
   * @param recursiveObjectFactoryOrScope
   */
  asRecursiveObject<RecursiveObjectType extends object>(
    recursiveObjectFactoryOrScope:
      | RecursiveObjectFactory<RecursiveObjectType>
      | RecursiveObjectFactoryScope<RecursiveObjectType>
  ): LookupToDataExtractorBindingBuilder<LookupResultType, RecursiveObjectType>;

  /**
   * Creates binding to custom value, using given callback or callback factory.
   *
   * @param cb
   */
  callback<CallbackReturnType>(
    cb:
      | SingleNodeDataExtractorFn<CallbackReturnType>
      | SingleNodeDataExtractorFnFactory<CallbackReturnType>
  ): LookupToDataExtractorBindingBuilder<LookupResultType, CallbackReturnType>;
}

/**
 * Checks if given value is SingleNodeLookupBuilder.
 *
 * @param obj
 */
export function isSingleNodeLookupBuilder(
  obj: unknown
): obj is SingleNodeLookupBuilder<SingleNodeLookupResult> {
  return (
    typeof obj === "object" &&
    obj !== null &&
    (
      [
        "buildNodeLookup",
        "mandatory",
        "optional",
        "asString",
        "asNumber",
        "asBoolean",
        "asObject",
        "asRecursiveObject",
        "callback",
      ] as (keyof SingleNodeLookupBuilder<SingleNodeLookupResult>)[]
    ).every(
      (key) =>
        key in obj &&
        typeof (
          obj as Partial<SingleNodeLookupBuilder<SingleNodeLookupResult>>
        )[key] === "function"
    )
  );
}
