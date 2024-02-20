import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "../SingleNodeDataExtractorFnFactory";
import { extractString } from "./extractString";

export class StringExtractorFactory
  implements SingleNodeDataExtractorFnFactory<string>
{
  createNodeDataExtractor(): SingleNodeDataExtractorFn<string> {
    return extractString;
  }
}
