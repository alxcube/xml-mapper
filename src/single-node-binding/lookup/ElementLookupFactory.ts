import type { SelectSingleReturnType } from "xpath";
import { isElement } from "../../utils";
import { AbstractSingleNodeLookupFactory } from "./AbstractSingleNodeLookupFactory";

/**
 * Creates lookup function, which returns Element node as lookup result.
 */
export class ElementLookupFactory extends AbstractSingleNodeLookupFactory<Element> {
  /**
   * @inheritDoc
   */
  protected getReturnTypeName(): string {
    return "Element";
  }

  /**
   * @inheritDoc
   */
  protected getTypeCheckFn(): (
    xpathResult: SelectSingleReturnType
  ) => xpathResult is Element {
    return (result: SelectSingleReturnType): result is Element => {
      return isElement(result);
    };
  }
}
