import type { SelectReturnType, XPathSelect } from "xpath";
import type { NodesArrayLookupFn } from "../NodesArrayLookupFn";
import { getTypeName } from "../../utils/getTypeName";
import { isArrayLike } from "../../utils/isArrayLike";
import type { NodesArrayLookupFactory } from "../NodesArrayLookupFactory";

export abstract class AbstractNodesArrayLookupFactory<T extends Node>
  implements NodesArrayLookupFactory<T[] | undefined>
{
  protected abstract getTypeCheckFn(): (
    xpathResult: SelectReturnType
  ) => xpathResult is T[];

  protected abstract getArrayItemTypeName(): string;

  createNodesArrayLookup(path: string): NodesArrayLookupFn<T[] | undefined> {
    const checkType = this.getTypeCheckFn();

    return (contextNode: Node, xpathSelect: XPathSelect): T[] | undefined => {
      const result = xpathSelect(path, contextNode);
      if (isArrayLike(result) && !result.length) {
        return undefined;
      }

      if (checkType(result)) {
        return result;
      }

      let reason: string;
      if (isArrayLike(result)) {
        reason =
          "some or all lookup result array elements are of different type";
      } else {
        reason = `got ${getTypeName(result)}`;
      }

      throw new TypeError(
        `Unexpected lookup result. Expected type ${this.getArrayItemTypeName()}[], but ${reason}. Lookup path: "${path}"`
      );
    };
  }
}
