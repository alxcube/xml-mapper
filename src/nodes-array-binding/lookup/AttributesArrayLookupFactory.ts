import type { SelectReturnType } from "xpath";
import { isAttr } from "../../utils";
import { AbstractNodesArrayLookupFactory } from "./AbstractNodesArrayLookupFactory";

export class AttributesArrayLookupFactory extends AbstractNodesArrayLookupFactory<Attr> {
  protected getArrayItemTypeName(): string {
    return "Attr";
  }

  protected getTypeCheckFn(): (
    xpathResult: SelectReturnType
  ) => xpathResult is Attr[] {
    return (xpathResult: SelectReturnType): xpathResult is Attr[] => {
      return Array.isArray(xpathResult) && xpathResult.every(isAttr);
    };
  }
}
