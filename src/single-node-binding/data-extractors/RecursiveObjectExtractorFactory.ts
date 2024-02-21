import type { XPathSelect } from "xpath";
import type { ObjectBlueprint } from "../../ObjectBlueprint";
import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "../SingleNodeDataExtractorFnFactory";
import { ObjectExtractorFactory } from "./ObjectExtractorFactory";

export interface RecursiveObjectFactory<T extends object> {
  (recursion: RecursiveObjectFactoryScope<T>): ObjectBlueprint<T>;
}

export interface RecursiveObjectFactoryScope<T extends object> {
  getDepth(): number;
  getRecursiveObjectFactory(): RecursiveObjectFactory<T>;
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
export class RecursiveObjectExtractorFactory<T extends object>
  implements
    SingleNodeDataExtractorFnFactory<T>,
    RecursiveObjectFactoryScope<T>
{
  private readonly depth: number;
  constructor(
    private readonly blueprintFactoryOrScope:
      | RecursiveObjectFactory<T>
      | RecursiveObjectFactoryScope<T>
  ) {
    this.depth = isRecursiveObjectFactoryScope(blueprintFactoryOrScope)
      ? blueprintFactoryOrScope.getDepth() + 1
      : 0;
  }

  createNodeDataExtractor(): SingleNodeDataExtractorFn<T> {
    const recursiveObjectFactory = this.getRecursiveObjectFactory();
    return (node: Node, xpathSelect: XPathSelect): T => {
      const objectExtractor = new ObjectExtractorFactory(
        recursiveObjectFactory(this)
      );
      return objectExtractor.createNodeDataExtractor()(node, xpathSelect);
    };
  }

  getDepth(): number {
    return this.depth;
  }

  getRecursiveObjectFactory(): RecursiveObjectFactory<T> {
    return isRecursiveObjectFactoryScope(this.blueprintFactoryOrScope)
      ? this.blueprintFactoryOrScope.getRecursiveObjectFactory()
      : this.blueprintFactoryOrScope;
  }
}
