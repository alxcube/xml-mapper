import { describe, expect, it } from "vitest";
import { isNode } from "../../../src";

describe("isNode() function", () => {
  it("should return true when passed object with 'nodeType' property of type number", () => {
    expect(isNode({ nodeType: 1 })).toBe(true);
    expect(isNode({ nodeType: "1" })).toBe(false);
  });
});
