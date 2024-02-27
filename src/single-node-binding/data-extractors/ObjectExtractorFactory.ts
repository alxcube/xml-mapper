import type { ObjectBlueprint } from "../../ObjectBlueprint";
import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "../SingleNodeDataExtractorFnFactory";
import { createObjectExtractor } from "./createObjectExtractor";

/**
 * Factory of object SingleNodeDataExtractorFn. Takes Object blueprint and creates SingleNodeDataExtractorFn,
 * that builds object of shape, defined by blueprint.
 */
export class ObjectExtractorFactory<ObjectType extends object>
  implements SingleNodeDataExtractorFnFactory<ObjectType>
{
  /**
   * ObjectExtractorFactory constructor.
   *
   * @param blueprint
   */
  constructor(private readonly blueprint: ObjectBlueprint<ObjectType>) {}

  /**
   * @inheritDoc
   */
  createNodeDataExtractor(): SingleNodeDataExtractorFn<ObjectType> {
    return createObjectExtractor(this.blueprint);
  }
}
