import type { XPathSelect } from "xpath";
import type { ObjectBlueprint } from "../../ObjectBlueprint";
import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import { isSingleNodeDataExtractorFnFactory } from "../SingleNodeDataExtractorFnFactory";

export function createObjectExtractor<ObjectType extends object>(
  blueprint: ObjectBlueprint<ObjectType>
): SingleNodeDataExtractorFn<ObjectType> {
  return (node: Node, xpathSelect: XPathSelect): ObjectType => {
    const result = {} as Partial<ObjectType>;
    const keys = Object.keys(blueprint) as (keyof ObjectType)[];
    for (const key of keys) {
      const extractor = blueprint[key];
      const value = isSingleNodeDataExtractorFnFactory(extractor)
        ? extractor.createNodeDataExtractor()(node, xpathSelect)
        : extractor(node, xpathSelect);
      if (value !== undefined) {
        result[key] = value;
      }
    }
    return result as ObjectType;
  };
}
