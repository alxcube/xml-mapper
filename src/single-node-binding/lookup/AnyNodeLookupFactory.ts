import type { SelectSingleReturnType } from "xpath";
import { isNode } from "../../utils";
import { AbstractSingleNodeLookupFactory } from "./AbstractSingleNodeLookupFactory";

/**
 * Creates lookup function, which can return any type of Node as lookup result.
 */
export class AnyNodeLookupFactory extends AbstractSingleNodeLookupFactory<Node> {
  /**
   * @inheritDoc
   */
  protected getReturnTypeName(): string {
    return "Node";
  }

  /**
   * @inheritDoc
   */
  protected getTypeCheckFn(): (
    xpathResult: SelectSingleReturnType
  ) => xpathResult is Node {
    return (result: SelectSingleReturnType): result is Node => {
      return isNode(result);
    };
  }
}
