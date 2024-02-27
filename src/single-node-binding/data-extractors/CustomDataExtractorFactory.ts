import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import {
  isSingleNodeDataExtractorFnFactory,
  type SingleNodeDataExtractorFnFactory,
} from "../SingleNodeDataExtractorFnFactory";

/**
 * Custom SingleNodeDataExtractorFn factory. Creates data extractor, using given callback or
 * SingleNodeDataExtractorFn factory.
 */
export class CustomDataExtractorFactory<CallbackReturnType>
  implements SingleNodeDataExtractorFnFactory<CallbackReturnType>
{
  /**
   * CustomDataExtractorFactory constructor.
   *
   * @param extractor
   */
  constructor(
    private readonly extractor:
      | SingleNodeDataExtractorFn<CallbackReturnType>
      | SingleNodeDataExtractorFnFactory<CallbackReturnType>
  ) {}

  /**
   * @inheritDoc
   */
  createNodeDataExtractor(): SingleNodeDataExtractorFn<CallbackReturnType> {
    return isSingleNodeDataExtractorFnFactory(this.extractor)
      ? this.extractor.createNodeDataExtractor()
      : this.extractor;
  }
}
