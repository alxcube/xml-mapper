import type { SelectReturnType } from "xpath";
import { isAttr } from "../../utils";
import { AbstractNodesArrayLookupFactory } from "./AbstractNodesArrayLookupFactory";

/**
 * Creates lookup function, which returns array of Attr nodes as lookup result.
 */
export class AttributesArrayLookupFactory extends AbstractNodesArrayLookupFactory<Attr> {
  /**
   * @inheritDoc
   */
  protected getArrayItemTypeName(): string {
    return "Attr";
  }

  /**
   * @inheritDoc
   */
  protected getTypeCheckFn(): (
    xpathResult: SelectReturnType
  ) => xpathResult is Attr[] {
    return (xpathResult: SelectReturnType): xpathResult is Attr[] => {
      return Array.isArray(xpathResult) && xpathResult.every(isAttr);
    };
  }
}
