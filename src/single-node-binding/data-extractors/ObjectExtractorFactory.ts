import type { ObjectBlueprint } from "../../ObjectBlueprint";
import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "../SingleNodeDataExtractorFnFactory";
import { createObjectExtractor } from "./createObjectExtractor";

export class ObjectExtractorFactory<T extends object>
  implements SingleNodeDataExtractorFnFactory<T>
{
  constructor(private readonly blueprint: ObjectBlueprint<T>) {}

  createNodeDataExtractor(): SingleNodeDataExtractorFn<T> {
    return createObjectExtractor(this.blueprint);
  }
}
