import type { XPathSelect } from "xpath";
import type { ObjectBlueprint } from "../../ObjectBlueprint";
import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import { isSingleNodeDataExtractorFnFactory } from "../SingleNodeDataExtractorFnFactory";

export function createObjectExtractor<T extends object>(
  blueprint: ObjectBlueprint<T>
): SingleNodeDataExtractorFn<T> {
  return (node: Node, xpathSelect: XPathSelect): T => {
    const result = {} as Partial<T>;
    const keys = Object.keys(blueprint) as (keyof T)[];
    for (const key of keys) {
      const extractor = blueprint[key];
      const value = isSingleNodeDataExtractorFnFactory(extractor)
        ? extractor.createNodeDataExtractor()(node, xpathSelect)
        : extractor(node, xpathSelect);
      if (value !== undefined) {
        result[key] = value;
      }
    }
    return result as T;
  };
}
