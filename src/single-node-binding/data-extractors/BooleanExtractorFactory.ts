import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "../SingleNodeDataExtractorFnFactory";
import { extractBoolean } from "./extractBoolean";

export class BooleanExtractorFactory
  implements SingleNodeDataExtractorFnFactory<boolean>
{
  createNodeDataExtractor(): SingleNodeDataExtractorFn<boolean> {
    return extractBoolean;
  }
}
