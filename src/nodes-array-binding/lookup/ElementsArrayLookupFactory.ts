import type { SelectReturnType } from "xpath";
import { isElement } from "../../utils";
import { AbstractNodesArrayLookupFactory } from "./AbstractNodesArrayLookupFactory";

/**
 * Creates lookup function, which returns array of Element nodes as lookup result.
 */
export class ElementsArrayLookupFactory extends AbstractNodesArrayLookupFactory<Element> {
  /**
   * @inheritDoc
   */
  protected getArrayItemTypeName(): string {
    return "Element";
  }

  /**
   * @inheritDoc
   */
  protected getTypeCheckFn(): (
    xpathResult: SelectReturnType
  ) => xpathResult is Element[] {
    return (xpathResult: SelectReturnType): xpathResult is Element[] => {
      return Array.isArray(xpathResult) && xpathResult.every(isElement);
    };
  }
}
