import type { XPathSelect } from "xpath";
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
    const extractorFn = isSingleNodeDataExtractorFnFactory(this.extractor)
      ? this.extractor.createNodeDataExtractor()
      : this.extractor;
    return (node: Node, xpathSelect: XPathSelect): T =>
      extractorFn(node, xpathSelect);
  }
}
