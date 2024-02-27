import type { XPathSelect } from "xpath";
import type { NodesArrayDataExtractorFn } from "../NodesArrayDataExtractorFn";
import type { NodesArrayDataExtractorFnFactory } from "../NodesArrayDataExtractorFnFactory";
import {
  type SingleNodeDataExtractorFn,
  isSingleNodeDataExtractorFnFactory,
  type SingleNodeDataExtractorFnFactory,
} from "../../single-node-binding";

/**
 * Nodes array data mapper. Creates NodesArrayDataExtractorFn, which calls given SingleNodeDataExtractorFn for each
 * node, and returns mapped array, filtered of undefined values.
 */
export class NodesArrayDataMapper<MappingFunctionReturnType>
  implements
    NodesArrayDataExtractorFnFactory<NonNullable<MappingFunctionReturnType>[]>
{
  /**
   * NodesArrayDataMapper constructor.
   *
   * @param mapper
   */
  constructor(
    private readonly mapper:
      | SingleNodeDataExtractorFn<MappingFunctionReturnType>
      | SingleNodeDataExtractorFnFactory<MappingFunctionReturnType>
  ) {}

  /**
   * @inheritDoc
   */
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
