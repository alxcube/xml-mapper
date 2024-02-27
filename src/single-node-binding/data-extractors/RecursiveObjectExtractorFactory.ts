import type { XPathSelect } from "xpath";
import type { ObjectBlueprint } from "../../ObjectBlueprint";
import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "../SingleNodeDataExtractorFnFactory";
import { ObjectExtractorFactory } from "./ObjectExtractorFactory";

/**
 * Function that accepts RecursiveObjectFactoryScope and returns ObjectBlueprint of recursive object.
 */
export interface RecursiveObjectFactory<RecursiveObjectType extends object> {
  (
    recursion: RecursiveObjectFactoryScope<RecursiveObjectType>
  ): ObjectBlueprint<RecursiveObjectType>;
}

/**
 * Scope object, which handles recursion level data.
 */
export interface RecursiveObjectFactoryScope<
  RecursiveObjectType extends object,
> {
  /**
   * Returns current recursion depth.
   */
  getDepth(): number;

  /**
   * Returns RecursiveObjectFactory function.
   */
  getRecursiveObjectFactory(): RecursiveObjectFactory<RecursiveObjectType>;
}

/**
 * Checks if given object is RecursiveObjectFactoryScope.
 *
 * @param obj
 */
export function isRecursiveObjectFactoryScope<T extends object>(
  obj: RecursiveObjectFactoryScope<T> | RecursiveObjectFactory<T>
): obj is RecursiveObjectFactoryScope<T> {
  return (
    typeof obj === "object" &&
    typeof obj.getDepth === "function" &&
    typeof obj.getRecursiveObjectFactory === "function"
  );
}

/**
 * Factory of recursive object SingleNodeDataExtractor.
 */
export class RecursiveObjectExtractorFactory<RecursiveObjectType extends object>
  implements
    SingleNodeDataExtractorFnFactory<RecursiveObjectType>,
    RecursiveObjectFactoryScope<RecursiveObjectType>
{
  /**
   * Recursion depth.
   * @private
   */
  private readonly depth: number;

  /**
   * RecursiveObjectExtractorFactory constructor.
   *
   * @param blueprintFactoryOrScope
   */
  constructor(
    private readonly blueprintFactoryOrScope:
      | RecursiveObjectFactory<RecursiveObjectType>
      | RecursiveObjectFactoryScope<RecursiveObjectType>
  ) {
    this.depth = isRecursiveObjectFactoryScope(blueprintFactoryOrScope)
      ? blueprintFactoryOrScope.getDepth() + 1
      : 0;
  }

  /**
   * @inheritDoc
   */
  createNodeDataExtractor(): SingleNodeDataExtractorFn<RecursiveObjectType> {
    const recursiveObjectFactory = this.getRecursiveObjectFactory();
    return (node: Node, xpathSelect: XPathSelect): RecursiveObjectType => {
      const objectExtractor = new ObjectExtractorFactory(
        recursiveObjectFactory(this)
      );
      return objectExtractor.createNodeDataExtractor()(node, xpathSelect);
    };
  }

  /**
   * @inheritDoc
   */
  getDepth(): number {
    return this.depth;
  }

  /**
   * @inheritDoc
   */
  getRecursiveObjectFactory(): RecursiveObjectFactory<RecursiveObjectType> {
    return isRecursiveObjectFactoryScope(this.blueprintFactoryOrScope)
      ? this.blueprintFactoryOrScope.getRecursiveObjectFactory()
      : this.blueprintFactoryOrScope;
  }
}
