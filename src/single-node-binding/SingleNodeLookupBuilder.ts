import type { ObjectBlueprint } from "../ObjectBlueprint";
import type { RecursiveObjectFactory } from "./data-extractors/RecursiveObjectExtractorFactory";
import type { SingleNodeBindingBuilder } from "./SingleNodeBindingBuilder";
import type { SingleNodeDataExtractorFn } from "./SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "./SingleNodeDataExtractorFnFactory";
import type {
  SingleNodeLookupFn,
  SingleNodeLookupResult,
} from "./SingleNodeLookupFn";

export interface SingleNodeLookupBuilder<T extends SingleNodeLookupResult> {
  buildNodeLookup(): SingleNodeLookupFn<T>;

  mandatory(): SingleNodeLookupBuilder<NonNullable<T>>;

  optional(): SingleNodeLookupBuilder<T | undefined>;

  asString(): SingleNodeBindingBuilder<T, string>;

  asNumber(): SingleNodeBindingBuilder<T, number>;

  asBoolean(): SingleNodeBindingBuilder<T, boolean>;

  asObject<OT extends object>(
    blueprint: ObjectBlueprint<OT>
  ): SingleNodeBindingBuilder<T, OT>;

  asRecursiveObject<RO extends object>(
    factory: RecursiveObjectFactory<RO>
  ): SingleNodeBindingBuilder<T, RO>;

  callback<CB>(
    cb: SingleNodeDataExtractorFn<CB> | SingleNodeDataExtractorFnFactory<CB>
  ): SingleNodeBindingBuilder<T, CB>;
}
