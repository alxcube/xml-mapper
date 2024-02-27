import type { NodesArrayDataExtractorFn } from "../NodesArrayDataExtractorFn";
import {
  isNodesArrayDataExtractorFnFactory,
  type NodesArrayDataExtractorFnFactory,
} from "../NodesArrayDataExtractorFnFactory";

/**
 * Custom array data extractor factory. Returns given callback, or callback, created by given factory
 * as data extractor function.
 */
export class CustomArrayDataExtractorFactory<CallbackReturnType>
  implements NodesArrayDataExtractorFnFactory<CallbackReturnType>
{
  /**
   * CustomArrayDataExtractorFactory constructor.
   *
   * @param callback
   */
  constructor(
    private readonly callback:
      | NodesArrayDataExtractorFnFactory<CallbackReturnType>
      | NodesArrayDataExtractorFn<CallbackReturnType>
  ) {}

  /**
   * @inheritDoc
   */
  createNodesArrayDataExtractor(): NodesArrayDataExtractorFn<CallbackReturnType> {
    return isNodesArrayDataExtractorFnFactory(this.callback)
      ? this.callback.createNodesArrayDataExtractor()
      : this.callback;
  }
}
