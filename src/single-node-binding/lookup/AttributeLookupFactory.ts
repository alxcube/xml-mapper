import type { SelectSingleReturnType } from "xpath";
import { isAttr } from "../../utils";
import { AbstractSingleNodeLookupFactory } from "./AbstractSingleNodeLookupFactory";

/**
 * Creates lookup function, which returns Attr node as lookup result.
 */
export class AttributeLookupFactory extends AbstractSingleNodeLookupFactory<Attr> {
  /**
   * @inheritDoc
   */
  protected getReturnTypeName(): string {
    return "Attr";
  }

  /**
   * @inheritDoc
   */
  protected getTypeCheckFn(): (
    xpathResult: SelectSingleReturnType
  ) => xpathResult is Attr {
    return (result: SelectSingleReturnType): result is Attr => {
      return isAttr(result);
    };
  }
}
