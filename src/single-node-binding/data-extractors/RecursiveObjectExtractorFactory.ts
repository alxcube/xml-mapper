import type { XPathSelect } from "xpath";
import type { ObjectBlueprint } from "../../ObjectBlueprint";
import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "../SingleNodeDataExtractorFnFactory";
import { ObjectExtractorFactory } from "./ObjectExtractorFactory";

export interface RecursiveObjectFactory<RecursiveObjectType extends object> {
  (
    recursion: RecursiveObjectFactoryScope<RecursiveObjectType>
  ): ObjectBlueprint<RecursiveObjectType>;
}

export interface RecursiveObjectFactoryScope<
  RecursiveObjectType extends object,
> {
  getDepth(): number;
  getRecursiveObjectFactory(): RecursiveObjectFactory<RecursiveObjectType>;
}

export function isRecursiveObjectFactoryScope<T extends object>(
  obj: RecursiveObjectFactoryScope<T> | RecursiveObjectFactory<T>
): obj is RecursiveObjectFactoryScope<T> {
  return (
    typeof obj === "object" &&
    typeof obj.getDepth === "function" &&
    typeof obj.getRecursiveObjectFactory === "function"
  );
}
export class RecursiveObjectExtractorFactory<RecursiveObjectType extends object>
  implements
    SingleNodeDataExtractorFnFactory<RecursiveObjectType>,
    RecursiveObjectFactoryScope<RecursiveObjectType>
{
  private readonly depth: number;
  constructor(
    private readonly blueprintFactoryOrScope:
      | RecursiveObjectFactory<RecursiveObjectType>
      | RecursiveObjectFactoryScope<RecursiveObjectType>
  ) {
    this.depth = isRecursiveObjectFactoryScope(blueprintFactoryOrScope)
      ? blueprintFactoryOrScope.getDepth() + 1
      : 0;
  }

  createNodeDataExtractor(): SingleNodeDataExtractorFn<RecursiveObjectType> {
    const recursiveObjectFactory = this.getRecursiveObjectFactory();
    return (node: Node, xpathSelect: XPathSelect): RecursiveObjectType => {
      const objectExtractor = new ObjectExtractorFactory(
        recursiveObjectFactory(this)
      );
      return objectExtractor.createNodeDataExtractor()(node, xpathSelect);
    };
  }

  getDepth(): number {
    return this.depth;
  }

  getRecursiveObjectFactory(): RecursiveObjectFactory<RecursiveObjectType> {
    return isRecursiveObjectFactoryScope(this.blueprintFactoryOrScope)
      ? this.blueprintFactoryOrScope.getRecursiveObjectFactory()
      : this.blueprintFactoryOrScope;
  }
}
