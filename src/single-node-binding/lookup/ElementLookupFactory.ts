import { isElement, type SelectSingleReturnType } from "xpath";
import { AbstractSingleNodeLookupFactory } from "./AbstractSingleNodeLookupFactory";

export class ElementLookupFactory extends AbstractSingleNodeLookupFactory<Element> {
  protected getReturnTypeName(): string {
    return "Element";
  }

  protected getTypeCheckFn(): (
    xpathResult: SelectSingleReturnType
  ) => xpathResult is Element {
    return (result: SelectSingleReturnType): result is Element => {
      return isElement(result);
    };
  }
}
