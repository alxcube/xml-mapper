import { beforeEach, describe, expect, it } from "vitest";
import { createObjectMapper } from "../../../../src";
import { parseXml } from "../../../helper/parseXml";

describe("createObjectMapper() function", () => {
  let dummyDoc: Document;

  beforeEach(() => {
    dummyDoc = parseXml("<Node/>");
  });

  it("should accept ObjectBlueprint and create function which creates object of given shape", () => {
    const factory = {
      createNodeDataExtractor: () => () => "returns string",
    };

    const objectExtractor = createObjectMapper({
      stringValue: factory,
      numberValue: () => 123,
      booleanValue: () => true,
    });

    expect(objectExtractor).toBeTypeOf("function");

    expect(objectExtractor(dummyDoc)).toEqual({
      stringValue: "returns string",
      numberValue: 123,
      booleanValue: true,
    });
  });

  it("should not include undefined keys in result object", () => {
    const objectExtractor = createObjectMapper({
      stringValue: () => "str",
      undefinedValue: () => undefined,
    });

    const obj = objectExtractor(dummyDoc);
    expect(obj).toEqual({
      stringValue: "str",
    });
    expect("undefinedValue" in obj).toBe(false);
  });
});
