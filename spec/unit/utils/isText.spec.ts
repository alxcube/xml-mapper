import { describe, expect, it } from "vitest";
import { isText } from "../../../src";

describe("isText() function", () => {
  it("should return true when passed object with 'nodeType' prop and 'TEXT_NODE' prop equal each other", () => {
    expect(isText({ nodeType: 3, TEXT_NODE: 3 })).toBe(true);
    expect(isText({ nodeType: 2, TEXT_NODE: 2 })).toBe(true);
    expect(isText({ nodeType: 2, TEXT_NODE: 3 })).toBe(false);
  });
});
