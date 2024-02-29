import { beforeEach, describe, expect, test } from "vitest";
import { BindingError } from "../../../src";

describe("LookupError class", () => {
  let error: BindingError;

  beforeEach(() => {
    error = new BindingError(
      "test lookup error",
      "binding name",
      new Error("test error")
    );
  });

  test("error data consistency", () => {
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("test lookup error");
    expect(error.name).toBe("BindingError");
    expect(error.bindingName).toBe("binding name");
    expect(error.cause).toBeInstanceOf(Error);
    expect(error.stack).toBeTypeOf("string");
  });
});
