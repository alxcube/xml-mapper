import {
  isNodeLike,
  type SelectSingleReturnType,
  type XPathSelect,
} from "xpath";
import type { SingleNodeLookupFn } from "../SingleNodeLookupFn";
import { getNodeTypeName } from "../../utils/getNodeTypeName";
import { getTypeName } from "../../utils/getTypeName";
import type { SingleNodeLookupFactory } from "../SingleNodeLookupFactory";

export abstract class AbstractSingleNodeLookupFactory<T extends Node>
  implements SingleNodeLookupFactory<T | undefined>
{
  protected abstract getTypeCheckFn(): (
    xpathResult: SelectSingleReturnType
  ) => xpathResult is T;

  protected abstract getReturnTypeName(): string;
  createSingleNodeLookup(path: string): SingleNodeLookupFn<T | undefined> {
    const checkType = this.getTypeCheckFn();

    return (contextNode: Node, xpathSelect: XPathSelect): T | undefined => {
      const result = xpathSelect(path, contextNode, true);
      if (result === undefined || result === null) {
        return undefined;
      }
      if (checkType(result)) {
        return result;
      }
      throw new TypeError(
        `Unexpected lookup result. Expected type ${this.getReturnTypeName()}, but got ${this.getReturnResultType(result)}. Lookup path: "${path}"`
      );
    };
  }

  protected getReturnResultType(result: SelectSingleReturnType): string {
    if (isNodeLike(result)) {
      return getNodeTypeName(result);
    }
    return getTypeName(result);
  }
}
