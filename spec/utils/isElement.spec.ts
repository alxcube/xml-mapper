import { describe, expect, it } from "vitest";
import { isElement } from "../../src";

describe("isElement() function", () => {
  it("should return true when passed object with 'nodeType' prop and 'ELEMENT_NODE' prop equal each other", () => {
    expect(isElement({ nodeType: 1, ELEMENT_NODE: 1 })).toBe(true);
    expect(isElement({ nodeType: 2, ELEMENT_NODE: 2 })).toBe(true);
    expect(isElement({ nodeType: 2, ELEMENT_NODE: 1 })).toBe(false);
  });
});
