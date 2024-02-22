import type { ObjectBlueprint } from "../../ObjectBlueprint";
import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "../SingleNodeDataExtractorFnFactory";
import { createObjectExtractor } from "./createObjectExtractor";

export class ObjectExtractorFactory<ObjectType extends object>
  implements SingleNodeDataExtractorFnFactory<ObjectType>
{
  constructor(private readonly blueprint: ObjectBlueprint<ObjectType>) {}

  createNodeDataExtractor(): SingleNodeDataExtractorFn<ObjectType> {
    return createObjectExtractor(this.blueprint);
  }
}
