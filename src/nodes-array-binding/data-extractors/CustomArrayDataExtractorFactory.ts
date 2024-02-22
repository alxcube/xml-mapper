import type { NodesArrayDataExtractorFn } from "../NodesArrayDataExtractorFn";
import {
  isNodesArrayDataExtractorFnFactory,
  type NodesArrayDataExtractorFnFactory,
} from "../NodesArrayDataExtractorFnFactory";

export class CustomArrayDataExtractorFactory<CallbackReturnType>
  implements NodesArrayDataExtractorFnFactory<CallbackReturnType>
{
  constructor(
    private readonly callback:
      | NodesArrayDataExtractorFnFactory<CallbackReturnType>
      | NodesArrayDataExtractorFn<CallbackReturnType>
  ) {}

  createNodesArrayDataExtractor(): NodesArrayDataExtractorFn<CallbackReturnType> {
    return isNodesArrayDataExtractorFnFactory(this.callback)
      ? this.callback.createNodesArrayDataExtractor()
      : this.callback;
  }
}
