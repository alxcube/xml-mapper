import type { NodesArrayLookupBuilder } from "./nodes-array-binding";
import type {
  SingleNodeDataExtractorFn,
  SingleNodeLookupBuilder,
} from "./single-node-binding";

/**
 * Mapping builder -- first step of mapping building process.
 */
export interface MappingBuilder {
  /**
   * Maps binding to single node of any type, using xpath expression.
   *
   * @param path
   */
  toNode(path: string): SingleNodeLookupBuilder<Node | undefined>;

  /**
   * Maps binding to array of nodes of any type, using xpath expression.
   *
   * @param path
   */
  toNodesArray(path: string): NodesArrayLookupBuilder<Node[] | undefined>;

  /**
   * Returns SingleNodeDataExtractorFn, which returns given constant value.
   *
   * @param value
   */
  constant<T>(value: T): SingleNodeDataExtractorFn<T>;
}
