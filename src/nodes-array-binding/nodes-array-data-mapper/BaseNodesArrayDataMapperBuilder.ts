import { BaseNodesArrayBindingBuilder } from "../BaseNodesArrayBindingBuilder";
import type { NodesArrayBindingBuilder } from "../NodesArrayBindingBuilder";
import type { NodesArrayLookupBuilder } from "../NodesArrayLookupBuilder";
import type { NodesArrayLookupResult } from "../NodesArrayLookupFn";
import type { ObjectBlueprint } from "../../ObjectBlueprint";
import {
  BooleanExtractorFactory,
  NumberExtractorFactory,
  ObjectExtractorFactory,
  StringExtractorFactory,
} from "../../single-node-binding";
import {
  RecursiveObjectExtractorFactory,
  type RecursiveObjectFactory,
  type SingleNodeDataExtractorFn,
  type SingleNodeDataExtractorFnFactory,
} from "../../single-node-binding";
import { NodesArrayDataMapper } from "./NodesArrayDataMapper";
import type { NodesArrayDataMapperBuilder } from "../NodesArrayDataMapperBuilder";

export class BaseNodesArrayDataMapperBuilder<L extends NodesArrayLookupResult>
  implements NodesArrayDataMapperBuilder<L>
{
  constructor(private readonly lookupBuilder: NodesArrayLookupBuilder<L>) {}

  ofBooleans(): NodesArrayBindingBuilder<L, boolean[]> {
    return new BaseNodesArrayBindingBuilder(
      this.lookupBuilder,
      new NodesArrayDataMapper(new BooleanExtractorFactory())
    );
  }

  ofNumbers(): NodesArrayBindingBuilder<L, number[]> {
    return new BaseNodesArrayBindingBuilder(
      this.lookupBuilder,
      new NodesArrayDataMapper(new NumberExtractorFactory())
    );
  }

  ofObjects<OT extends object>(
    blueprint: ObjectBlueprint<OT>
  ): NodesArrayBindingBuilder<L, OT[]> {
    return new BaseNodesArrayBindingBuilder(
      this.lookupBuilder,
      new NodesArrayDataMapper(new ObjectExtractorFactory(blueprint))
    );
  }

  ofStrings(): NodesArrayBindingBuilder<L, string[]> {
    return new BaseNodesArrayBindingBuilder(
      this.lookupBuilder,
      new NodesArrayDataMapper(new StringExtractorFactory())
    );
  }

  ofRecursiveObjects<RO extends object>(
    factory: RecursiveObjectFactory<RO>
  ): NodesArrayBindingBuilder<L, RO[]> {
    return new BaseNodesArrayBindingBuilder(
      this.lookupBuilder,
      new NodesArrayDataMapper(new RecursiveObjectExtractorFactory(factory))
    );
  }

  usingMapper<CB>(
    cb: SingleNodeDataExtractorFn<CB> | SingleNodeDataExtractorFnFactory<CB>
  ): NodesArrayBindingBuilder<L, CB[]> {
    return new BaseNodesArrayBindingBuilder(
      this.lookupBuilder,
      new NodesArrayDataMapper(cb)
    );
  }
}
