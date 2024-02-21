import { describe, expect, it } from "vitest";
import { isAttr } from "../../src";

describe("isAttr() function", () => {
  it("should return true when passed with 'nodeType' prop and 'ATTRIBUTE_NODE' prop to equal each other", () => {
    expect(isAttr({ nodeType: 2, ATTRIBUTE_NODE: 2 })).toBe(true);
    expect(isAttr({ nodeType: 1, ATTRIBUTE_NODE: 1 })).toBe(true);
    expect(isAttr({ nodeType: 2, ATTRIBUTE_NODE: 1 })).toBe(false);
  });
});
