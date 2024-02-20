import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "../SingleNodeDataExtractorFnFactory";
import { extractNumber } from "./extractNumber";

export class NumberExtractorFactory
  implements SingleNodeDataExtractorFnFactory<number>
{
  createNodeDataExtractor(): SingleNodeDataExtractorFn<number> {
    return extractNumber;
  }
}
