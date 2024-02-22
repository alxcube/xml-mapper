import type { XPathSelect } from "xpath";
import type { NodesArrayDataExtractorFn } from "../NodesArrayDataExtractorFn";
import type { NodesArrayDataExtractorFnFactory } from "../NodesArrayDataExtractorFnFactory";
import {
  type SingleNodeDataExtractorFn,
  isSingleNodeDataExtractorFnFactory,
  type SingleNodeDataExtractorFnFactory,
} from "../../single-node-binding";

export class NodesArrayDataMapper<MappingFunctionReturnType>
  implements
    NodesArrayDataExtractorFnFactory<NonNullable<MappingFunctionReturnType>[]>
{
  constructor(
    private readonly mapper:
      | SingleNodeDataExtractorFn<MappingFunctionReturnType>
      | SingleNodeDataExtractorFnFactory<MappingFunctionReturnType>
  ) {}

  createNodesArrayDataExtractor(): NodesArrayDataExtractorFn<
    NonNullable<MappingFunctionReturnType>[]
  > {
    const mapper = this.mapper;
    const mappingFn = isSingleNodeDataExtractorFnFactory(mapper)
      ? mapper.createNodeDataExtractor()
      : mapper;

    return (
      nodes: Node[],
      xpathSelect: XPathSelect
    ): NonNullable<MappingFunctionReturnType>[] => {
      return nodes
        .map((node) => mappingFn(node, xpathSelect))
        .filter(
          (value) => value !== undefined && value !== null
        ) as NonNullable<MappingFunctionReturnType>[];
    };
  }
}
