import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "../SingleNodeDataExtractorFnFactory";
import { extractBoolean } from "./extractBoolean";

/**
 * Factory of boolean SingleNodeDataExtractorFn.
 */
export class BooleanExtractorFactory
  implements SingleNodeDataExtractorFnFactory<boolean>
{
  /**
   * @inheritDoc
   */
  createNodeDataExtractor(): SingleNodeDataExtractorFn<boolean> {
    return extractBoolean;
  }
}
