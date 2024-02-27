import type { XPathSelect } from "xpath";
import type { ObjectBlueprint } from "../../ObjectBlueprint";
import type { SingleNodeDataExtractorFn } from "../SingleNodeDataExtractorFn";
import { isSingleNodeDataExtractorFnFactory } from "../SingleNodeDataExtractorFnFactory";

/**
 * Creates SingleNodeDataExtractorFn of object. Created function should accept context node, generally, document root,
 * and calls ObjectBlueprint's callbacks with context of that root node, to build object of interface, defined by
 * blueprint.
 *
 * @param blueprint
 */
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
