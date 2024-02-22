import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import {
  isSingleNodeDataExtractorFnFactory,
  type SingleNodeDataExtractorFnFactory,
} from "../SingleNodeDataExtractorFnFactory";

export class CustomDataExtractorFactory<T>
  implements SingleNodeDataExtractorFnFactory<T>
{
  constructor(
    private readonly extractor:
      | SingleNodeDataExtractorFn<T>
      | SingleNodeDataExtractorFnFactory<T>
  ) {}

  createNodeDataExtractor(): SingleNodeDataExtractorFn<T> {
    return isSingleNodeDataExtractorFnFactory(this.extractor)
      ? this.extractor.createNodeDataExtractor()
      : this.extractor;
  }
}
