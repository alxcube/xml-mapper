import type { XPathSelect } from "xpath";
import type { ObjectBlueprint } from "../ObjectBlueprint";
import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import type { SingleNodeDataExtractorFnFactory } from "../SingleNodeDataExtractorFnFactory";
import { ObjectExtractorFactory } from "./ObjectExtractorFactory";

export interface RecursiveObjectFactory<T extends object> {
  (recursion: RecursiveObjectFactory<T>): ObjectBlueprint<T>;
}
export class RecursiveObjectExtractorFactory<T extends object>
  implements SingleNodeDataExtractorFnFactory<T>
{
  constructor(private readonly blueprintFactory: RecursiveObjectFactory<T>) {}

  createNodeDataExtractor(): SingleNodeDataExtractorFn<T> {
    const recursiveObjectFactory = this.blueprintFactory;
    return (node: Node, xpathSelect: XPathSelect): T => {
      const objectExtractor = new ObjectExtractorFactory(
        recursiveObjectFactory(recursiveObjectFactory)
      );
      return objectExtractor.createNodeDataExtractor()(node, xpathSelect);
    };
  }
}
