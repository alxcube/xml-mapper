import type { NodesArrayDataExtractorFn } from "../NodesArrayDataExtractorFn";
import {
  isNodesArrayDataExtractorFnFactory,
  type NodesArrayDataExtractorFnFactory,
} from "../NodesArrayDataExtractorFnFactory";

export class CustomArrayDataExtractorFactory<T>
  implements NodesArrayDataExtractorFnFactory<T>
{
  constructor(
    private readonly callback:
      | NodesArrayDataExtractorFnFactory<T>
      | NodesArrayDataExtractorFn<T>
  ) {}

  createNodesArrayDataExtractor(): NodesArrayDataExtractorFn<T> {
    return isNodesArrayDataExtractorFnFactory(this.callback)
      ? this.callback.createNodesArrayDataExtractor()
      : this.callback;
  }
}
