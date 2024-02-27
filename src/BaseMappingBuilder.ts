import type { MappingBuilder } from "./MappingBuilder";
import {
  AnyNodesArrayLookupFactory,
  AttributesArrayLookupFactory,
  BaseNodesArrayLookupBuilder,
  ElementsArrayLookupFactory,
} from "./nodes-array-binding";
import type { NodesArrayLookupBuilder } from "./nodes-array-binding";
import {
  AnyNodeLookupFactory,
  AttributeLookupFactory,
  BaseSingleNodeLookupBuilder,
  ElementLookupFactory,
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
  toAttribute(path: string): SingleNodeLookupBuilder<Attr | undefined> {
    return new BaseSingleNodeLookupBuilder(new AttributeLookupFactory(), path);
  }

  /**
   * @inheritDoc
   */
  toAttributesArray(path: string): NodesArrayLookupBuilder<Attr[] | undefined> {
    return new BaseNodesArrayLookupBuilder(
      new AttributesArrayLookupFactory(),
      path
    );
  }

  /**
   * @inheritDoc
   */
  toElement(path: string): SingleNodeLookupBuilder<Element | undefined> {
    return new BaseSingleNodeLookupBuilder(new ElementLookupFactory(), path);
  }

  /**
   * @inheritDoc
   */
  toElementsArray(
    path: string
  ): NodesArrayLookupBuilder<Element[] | undefined> {
    return new BaseNodesArrayLookupBuilder(
      new ElementsArrayLookupFactory(),
      path
    );
  }

  /**
   * @inheritDoc
   */
  toNode(path: string): SingleNodeLookupBuilder<Node | undefined> {
    return new BaseSingleNodeLookupBuilder(new AnyNodeLookupFactory(), path);
  }

  /**
   * @inheritDoc
   */
  toNodesArray(path: string): NodesArrayLookupBuilder<Node[] | undefined> {
    return new BaseNodesArrayLookupBuilder(
      new AnyNodesArrayLookupFactory(),
      path
    );
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
