import type { NodesArrayBindingBuilder } from "./NodesArrayBindingBuilder";
import type { NodesArrayLookupResult } from "./NodesArrayLookupFn";
import type { ObjectBlueprint } from "../ObjectBlueprint";
import type {
  RecursiveObjectFactory,
  RecursiveObjectFactoryScope,
  SingleNodeDataExtractorFn,
  SingleNodeDataExtractorFnFactory,
} from "../single-node-binding";

export interface NodesArrayDataMapperBuilder<L extends NodesArrayLookupResult> {
  ofStrings(): NodesArrayBindingBuilder<L, string[]>;

  ofNumbers(): NodesArrayBindingBuilder<L, number[]>;

  ofBooleans(): NodesArrayBindingBuilder<L, boolean[]>;

  ofObjects<OT extends object>(
    blueprint: ObjectBlueprint<OT>
  ): NodesArrayBindingBuilder<L, OT[]>;

  ofRecursiveObjects<RO extends object>(
    factoryOrScope: RecursiveObjectFactory<RO> | RecursiveObjectFactoryScope<RO>
  ): NodesArrayBindingBuilder<L, RO[]>;

  usingMapper<CB>(
    cb: SingleNodeDataExtractorFn<CB> | SingleNodeDataExtractorFnFactory<CB>
  ): NodesArrayBindingBuilder<L, NonNullable<CB>[]>;
}
