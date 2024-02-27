import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "../SingleNodeDataExtractorFnFactory";
import { extractString } from "./extractString";

/**
 * Factory of string SingleNodeDataExtractorFn.
 */
export class StringExtractorFactory
  implements SingleNodeDataExtractorFnFactory<string>
{
  /**
   * @inheritDoc
   */
  createNodeDataExtractor(): SingleNodeDataExtractorFn<string> {
    return extractString;
  }
}
