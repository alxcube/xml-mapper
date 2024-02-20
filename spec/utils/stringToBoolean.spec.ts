import { describe, expect, it } from "vitest";
import { stringToBoolean } from "../../src";

describe("stringToBoolean() function", () => {
  it("should return true when passed any text except 'false', 'null' in any case and except when string is numeric and equals to 0", () => {
    expect(stringToBoolean("any text")).toBe(true);
    expect(stringToBoolean("134")).toBe(true);
    expect(stringToBoolean("false")).toBe(false);
    expect(stringToBoolean("FALSE")).toBe(false);
    expect(stringToBoolean("False")).toBe(false);
    expect(stringToBoolean("null")).toBe(false);
    expect(stringToBoolean("NULL")).toBe(false);
    expect(stringToBoolean("Null")).toBe(false);
    expect(stringToBoolean("0")).toBe(false);
    expect(stringToBoolean("+0")).toBe(false);
    expect(stringToBoolean("-0")).toBe(false);
  });
});
