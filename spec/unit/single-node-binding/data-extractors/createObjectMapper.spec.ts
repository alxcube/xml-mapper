import { beforeEach, describe, expect, it } from "vitest";
import { createObjectMapper, MappingError } from "../../../../src";
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

  it("should catch errors and throw MappingError with error mapping key in mappingPath", () => {
    const mapper = createObjectMapper({
      string: () => "string",
      corrupted: () => {
        throw new Error("Error in data extractor");
      },
    });

    try {
      mapper(dummyDoc);
      expect.fail("Should throw");
    } catch (e) {
      expect(e).toBeInstanceOf(MappingError);
      expect((e as MappingError).mappingPath).toEqual(["corrupted"]);
    }
  });
});
