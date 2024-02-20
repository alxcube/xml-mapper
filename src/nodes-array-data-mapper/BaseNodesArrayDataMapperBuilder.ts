import { BaseNodesArrayBindingBuilder } from "../BaseNodesArrayBindingBuilder";
import type { NodesArrayBindingBuilder } from "../NodesArrayBindingBuilder";
import type { NodesArrayLookupBuilder } from "../NodesArrayLookupBuilder";
import type { NodesArrayLookupResult } from "../NodesArrayLookupFn";
import type { ObjectBlueprint } from "../ObjectBlueprint";
import { BooleanExtractorFactory } from "../single-node-data-extractors/BooleanExtractorFactory";
import { NumberExtractorFactory } from "../single-node-data-extractors/NumberExtractorFactory";
import { ObjectExtractorFactory } from "../single-node-data-extractors/ObjectExtractorFactory";
import {
  RecursiveObjectExtractorFactory,
  type RecursiveObjectFactory,
} from "../single-node-data-extractors/RecursiveObjectExtractorFactory";
import { StringExtractorFactory } from "../single-node-data-extractors/StringExtractorFactory";
import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "../SingleNodeDataExtractorFnFactory";
import { NodesArrayDataMapper } from "./NodesArrayDataMapper";
import type { NodesArrayDataMapperBuilder } from "./NodesArrayDataMapperBuilder";

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
