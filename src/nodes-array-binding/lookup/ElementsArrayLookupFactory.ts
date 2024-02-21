import type { SelectReturnType } from "xpath";
import { isElement } from "../../utils";
import { AbstractNodesArrayLookupFactory } from "./AbstractNodesArrayLookupFactory";

export class ElementsArrayLookupFactory extends AbstractNodesArrayLookupFactory<Element> {
  protected getArrayItemTypeName(): string {
    return "Element";
  }

  protected getTypeCheckFn(): (
    xpathResult: SelectReturnType
  ) => xpathResult is Element[] {
    return (xpathResult: SelectReturnType): xpathResult is Element[] => {
      return Array.isArray(xpathResult) && xpathResult.every(isElement);
    };
  }
}
