import { describe, expect, it } from "vitest";
import { isComment } from "../../src";

describe("isComment() function", () => {
  it("should return true when passed object with 'nodeType' prop and 'COMMENT_NODE' prop eaual each other", () => {
    expect(isComment({ nodeType: 8, COMMENT_NODE: 8 })).toBe(true);
    expect(isComment({ nodeType: 1, COMMENT_NODE: 1 })).toBe(true);
    expect(isComment({ nodeType: 1, COMMENT_NODE: 8 })).toBe(false);
  });
});
