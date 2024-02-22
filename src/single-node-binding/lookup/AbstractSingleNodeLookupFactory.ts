import {
  isNodeLike,
  type SelectSingleReturnType,
  type XPathSelect,
} from "xpath";
import type { SingleNodeLookupFn } from "../SingleNodeLookupFn";
import { getNodeTypeName, getTypeName } from "../../utils";
import type { SingleNodeLookupFactory } from "../SingleNodeLookupFactory";

export abstract class AbstractSingleNodeLookupFactory<
  NodeLookupResult extends Node,
> implements SingleNodeLookupFactory<NodeLookupResult | undefined>
{
  protected abstract getTypeCheckFn(): (
    xpathResult: SelectSingleReturnType
  ) => xpathResult is NodeLookupResult;

  protected abstract getReturnTypeName(): string;
  createSingleNodeLookup(
    path: string
  ): SingleNodeLookupFn<NodeLookupResult | undefined> {
    const checkType = this.getTypeCheckFn();

    return (
      contextNode: Node,
      xpathSelect: XPathSelect
    ): NodeLookupResult | undefined => {
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
