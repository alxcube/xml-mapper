import type { XPathSelect } from "xpath";
import type { NodesArrayDataExtractorFn } from "../NodesArrayDataExtractorFn";
import type { NodesArrayDataExtractorFnFactory } from "../NodesArrayDataExtractorFnFactory";
import type { SingleNodeDataExtractorFn } from "../../single-node-binding/SingleNodeDataExtractorFn";
import {
  isSingleNodeDataExtractorFnFactory,
  type SingleNodeDataExtractorFnFactory,
} from "../../single-node-binding/SingleNodeDataExtractorFnFactory";

export class NodesArrayDataMapper<T>
  implements NodesArrayDataExtractorFnFactory<T[]>
{
  constructor(
    private readonly mapper:
      | SingleNodeDataExtractorFn<T>
      | SingleNodeDataExtractorFnFactory<T>
  ) {}

  createNodesArrayDataExtractor(): NodesArrayDataExtractorFn<T[]> {
    const mapper = this.mapper;
    const mappingFn = isSingleNodeDataExtractorFnFactory(mapper)
      ? mapper.createNodeDataExtractor()
      : mapper;

    return (nodes: Node[], xpathSelect: XPathSelect): T[] => {
      return nodes
        .map((node) => mappingFn(node, xpathSelect))
        .filter((value) => value !== undefined);
    };
  }
}
