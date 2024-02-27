import { isArrayOfNodes, type SelectReturnType } from "xpath";
import { AbstractNodesArrayLookupFactory } from "./AbstractNodesArrayLookupFactory";

/**
 * Creates lookup function, which can return array of nodes of any type as lookup result.
 */
export class AnyNodesArrayLookupFactory extends AbstractNodesArrayLookupFactory<Node> {
  /**
   * @inheritDoc
   */
  protected getArrayItemTypeName(): string {
    return "Node";
  }

  /**
   * @inheritDoc
   */
  protected getTypeCheckFn(): (
    xpathResult: SelectReturnType
  ) => xpathResult is Node[] {
    return isArrayOfNodes;
  }
}
