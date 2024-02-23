import type { ObjectBlueprint } from "../ObjectBlueprint";
import type {
  RecursiveObjectFactory,
  RecursiveObjectFactoryScope,
} from "./data-extractors";
import type { SingleNodeBindingBuilder } from "./SingleNodeBindingBuilder";
import type { SingleNodeDataExtractorFn } from "./SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "./SingleNodeDataExtractorFnFactory";
import type {
  SingleNodeLookupFn,
  SingleNodeLookupResult,
} from "./SingleNodeLookupFn";

export interface SingleNodeLookupBuilder<
  LookupResultType extends SingleNodeLookupResult,
> {
  buildNodeLookup(): SingleNodeLookupFn<LookupResultType>;

  mandatory(): SingleNodeLookupBuilder<NonNullable<LookupResultType>>;

  optional(): SingleNodeLookupBuilder<LookupResultType | undefined>;

  asString(): SingleNodeBindingBuilder<LookupResultType, string>;

  asNumber(): SingleNodeBindingBuilder<LookupResultType, number>;

  asBoolean(): SingleNodeBindingBuilder<LookupResultType, boolean>;

  asObject<ObjectType extends object>(
    blueprint: ObjectBlueprint<ObjectType>
  ): SingleNodeBindingBuilder<LookupResultType, ObjectType>;

  asRecursiveObject<RecursiveObjectType extends object>(
    recursiveObjectFactoryOrScope:
      | RecursiveObjectFactory<RecursiveObjectType>
      | RecursiveObjectFactoryScope<RecursiveObjectType>
  ): SingleNodeBindingBuilder<LookupResultType, RecursiveObjectType>;

  callback<CallbackReturnType>(
    cb:
      | SingleNodeDataExtractorFn<CallbackReturnType>
      | SingleNodeDataExtractorFnFactory<CallbackReturnType>
  ): SingleNodeBindingBuilder<LookupResultType, CallbackReturnType>;
}

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
