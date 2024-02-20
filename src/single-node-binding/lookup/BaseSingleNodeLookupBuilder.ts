import type { XPathSelect } from "xpath";
import { BaseSingleNodeBindingBuilder } from "../BaseSingleNodeBindingBuilder";
import type { ObjectBlueprint } from "../../ObjectBlueprint";
import {
  BooleanExtractorFactory,
  CustomDataExtractorFactory,
  NumberExtractorFactory,
  ObjectExtractorFactory,
  StringExtractorFactory,
} from "../data-extractors";
import {
  RecursiveObjectExtractorFactory,
  type RecursiveObjectFactory,
} from "../data-extractors";
import type { SingleNodeBindingBuilder } from "../SingleNodeBindingBuilder";
import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "../SingleNodeDataExtractorFnFactory";
import type { SingleNodeLookupBuilder } from "../SingleNodeLookupBuilder";
import type {
  SingleNodeLookupFn,
  SingleNodeLookupResult,
} from "../SingleNodeLookupFn";
import type { SingleNodeLookupFactory } from "../SingleNodeLookupFactory";

export class BaseSingleNodeLookupBuilder<T extends SingleNodeLookupResult>
  implements SingleNodeLookupBuilder<T>
{
  constructor(
    private readonly factory: SingleNodeLookupFactory<T>,
    private readonly path: string,
    private readonly isMandatory = false
  ) {}

  buildNodeLookup(): SingleNodeLookupFn<T> {
    const isMandatory = this.isMandatory;
    const path = this.path;
    const lookupFn = this.factory.createSingleNodeLookup(path);

    return (contextNode: Node, xpathSelect: XPathSelect): T => {
      const result = lookupFn(contextNode, xpathSelect);
      if (isMandatory && (result === undefined || result === null)) {
        throw new RangeError(`Mandatory node was not found by path: ${path}`);
      }
      return result;
    };
  }

  mandatory(): SingleNodeLookupBuilder<NonNullable<T>> {
    return new BaseSingleNodeLookupBuilder(
      this.factory,
      this.path,
      true
    ) as SingleNodeLookupBuilder<NonNullable<T>>;
  }

  optional(): SingleNodeLookupBuilder<T | undefined> {
    return new BaseSingleNodeLookupBuilder(
      this.factory,
      this.path,
      false
    ) as SingleNodeLookupBuilder<T | undefined>;
  }

  asString(): SingleNodeBindingBuilder<T, string> {
    return new BaseSingleNodeBindingBuilder(this, new StringExtractorFactory());
  }

  asNumber(): SingleNodeBindingBuilder<T, number> {
    return new BaseSingleNodeBindingBuilder(this, new NumberExtractorFactory());
  }

  asBoolean(): SingleNodeBindingBuilder<T, boolean> {
    return new BaseSingleNodeBindingBuilder(
      this,
      new BooleanExtractorFactory()
    );
  }

  asObject<OT extends object>(
    blueprint: ObjectBlueprint<OT>
  ): SingleNodeBindingBuilder<T, OT> {
    return new BaseSingleNodeBindingBuilder(
      this,
      new ObjectExtractorFactory(blueprint)
    );
  }

  asRecursiveObject<RO extends object>(
    factory: RecursiveObjectFactory<RO>
  ): SingleNodeBindingBuilder<T, RO> {
    return new BaseSingleNodeBindingBuilder(
      this,
      new RecursiveObjectExtractorFactory(factory)
    );
  }

  callback<CB>(
    cb: SingleNodeDataExtractorFn<CB> | SingleNodeDataExtractorFnFactory<CB>
  ): SingleNodeBindingBuilder<T, CB> {
    return new BaseSingleNodeBindingBuilder(
      this,
      new CustomDataExtractorFactory(cb)
    );
  }
}
