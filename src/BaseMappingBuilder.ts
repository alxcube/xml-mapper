import type { MappingBuilder } from "./MappingBuilder";
import { BaseNodesArrayLookupBuilder } from "./nodes-array-binding";
import type { NodesArrayLookupBuilder } from "./nodes-array-binding";
import {
  BaseSingleNodeLookupBuilder,
  type SingleNodeDataExtractorFn,
  type SingleNodeLookupBuilder,
} from "./single-node-binding";

/**
 * Implementation of MappingBuilder interface.
 */
export class BaseMappingBuilder implements MappingBuilder {
  /**
   * @inheritDoc
   */
  toNode(path: string): SingleNodeLookupBuilder<Node | undefined> {
    return new BaseSingleNodeLookupBuilder(path);
  }

  /**
   * @inheritDoc
   */
  toNodesArray(path: string): NodesArrayLookupBuilder<Node[] | undefined> {
    return new BaseNodesArrayLookupBuilder(path);
  }

  /**
   * @inheritDoc
   */
  constant<T>(value: T): SingleNodeDataExtractorFn<T> {
    return () => value;
  }
}

/**
 * Returns MappingBuilder interface for shorthand mapping.
 */
export function map(): MappingBuilder {
  return new BaseMappingBuilder();
}
