import { beforeEach, describe, expect, test } from "vitest";
import { LookupError } from "../../../src";

describe("LookupError class", () => {
  let error: LookupError;

  beforeEach(() => {
    error = new LookupError(
      "test lookup error",
      new Error("test error"),
      "path/to/node"
    );
  });

  test("error data consistency", () => {
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("test lookup error");
    expect(error.name).toBe("LookupError");
    expect(error.path).toBe("path/to/node");
    expect(error.cause).toBeInstanceOf(Error);
    expect(error.stack).toBeTypeOf("string");
  });
});
