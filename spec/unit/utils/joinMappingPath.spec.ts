import { describe, expect, it } from "vitest";
import { joinMappingPath } from "../../../src";

describe("joinMappingPath() function", () => {
  it("should join mapping path segments into path string", () => {
    expect(joinMappingPath(["p1", "p2", "p3"])).toBe("p1.p2.p3");
    expect(
      joinMappingPath([
        "property",
        "arrayProperty",
        3,
        "nestedArrayProperty",
        4,
      ])
    ).toBe("property.arrayProperty[3].nestedArrayProperty[4]");
    expect(joinMappingPath([0, 2, "prop"])).toBe("[0][2].prop");
  });
});
