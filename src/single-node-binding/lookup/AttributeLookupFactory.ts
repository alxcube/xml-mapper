import type { SelectSingleReturnType } from "xpath";
import { isAttr } from "../../utils";
import { AbstractSingleNodeLookupFactory } from "./AbstractSingleNodeLookupFactory";

export class AttributeLookupFactory extends AbstractSingleNodeLookupFactory<Attr> {
  protected getReturnTypeName(): string {
    return "Attr";
  }

  protected getTypeCheckFn(): (
    xpathResult: SelectSingleReturnType
  ) => xpathResult is Attr {
    return (result: SelectSingleReturnType): result is Attr => {
      return isAttr(result);
    };
  }
}
