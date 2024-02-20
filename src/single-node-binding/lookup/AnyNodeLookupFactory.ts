import { isNodeLike, type SelectSingleReturnType } from "xpath";
import { AbstractSingleNodeLookupFactory } from "./AbstractSingleNodeLookupFactory";

export class AnyNodeLookupFactory extends AbstractSingleNodeLookupFactory<Node> {
  protected getReturnTypeName(): string {
    return "Node";
  }

  protected getTypeCheckFn(): (
    xpathResult: SelectSingleReturnType
  ) => xpathResult is Node {
    return (result: SelectSingleReturnType): result is Node => {
      return isNodeLike(result);
    };
  }
}
