import { isArrayOfNodes, type SelectReturnType } from "xpath";
import { AbstractNodesArrayLookupFactory } from "./AbstractNodesArrayLookupFactory";

export class AnyNodesArrayLookupFactory extends AbstractNodesArrayLookupFactory<Node> {
  protected getArrayItemTypeName(): string {
    return "Node";
  }

  protected getTypeCheckFn(): (
    xpathResult: SelectReturnType
  ) => xpathResult is Node[] {
    return isArrayOfNodes;
  }
}
