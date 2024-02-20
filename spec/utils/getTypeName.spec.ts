import { describe, expect, it } from "vitest";
import { getTypeName } from "../../src";

describe("getTypeName() function", () => {
  it("should return type name of passed data", () => {
    expect(getTypeName("")).toBe("String");
    expect(getTypeName(1)).toBe("Number");
    expect(getTypeName(undefined)).toBe("Undefined");
    expect(getTypeName([])).toBe("Array");
    expect(getTypeName(null)).toBe("Null");
    expect(getTypeName({})).toBe("Object");
    expect(getTypeName(() => 1)).toBe("Function");
    expect(getTypeName(true)).toBe("Boolean");
  });
});
