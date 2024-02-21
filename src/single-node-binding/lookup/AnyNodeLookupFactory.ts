import type { SelectSingleReturnType } from "xpath";
import { isNode } from "../../utils";
import { AbstractSingleNodeLookupFactory } from "./AbstractSingleNodeLookupFactory";

export class AnyNodeLookupFactory extends AbstractSingleNodeLookupFactory<Node> {
  protected getReturnTypeName(): string {
    return "Node";
  }

  protected getTypeCheckFn(): (
    xpathResult: SelectSingleReturnType
  ) => xpathResult is Node {
    return (result: SelectSingleReturnType): result is Node => {
      return isNode(result);
    };
  }
}
