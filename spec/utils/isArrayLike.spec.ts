import { describe, expect, it } from "vitest";
import { isArrayLike } from "../../src";

describe("isArrayLike() function", () => {
  it("should return true when passed object with length property of type number", () => {
    expect(isArrayLike([])).toBe(true);
    expect(isArrayLike({ length: 0 })).toBe(true);
    expect(isArrayLike({ length: "0" })).toBe(false);
  });
});
