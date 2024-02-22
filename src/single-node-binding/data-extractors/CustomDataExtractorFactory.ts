import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import {
  isSingleNodeDataExtractorFnFactory,
  type SingleNodeDataExtractorFnFactory,
} from "../SingleNodeDataExtractorFnFactory";

export class CustomDataExtractorFactory<CallbackReturnType>
  implements SingleNodeDataExtractorFnFactory<CallbackReturnType>
{
  constructor(
    private readonly extractor:
      | SingleNodeDataExtractorFn<CallbackReturnType>
      | SingleNodeDataExtractorFnFactory<CallbackReturnType>
  ) {}

  createNodeDataExtractor(): SingleNodeDataExtractorFn<CallbackReturnType> {
    return isSingleNodeDataExtractorFnFactory(this.extractor)
      ? this.extractor.createNodeDataExtractor()
      : this.extractor;
  }
}
