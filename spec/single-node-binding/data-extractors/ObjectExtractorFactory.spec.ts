import { describe, expect, it } from "vitest";
import xpath from "xpath";
import { ObjectExtractorFactory } from "../../../src";
import { parseXml } from "../../helper/parseXml";

describe("ObjectExtractorFactory class", () => {
  it("should accept ObjectBlueprint in constructor and create function, that will create objects of given shape", () => {
    const factory = new ObjectExtractorFactory({
      numberValue: () => 123,
      stringValue: () => "str",
    });

    const objectExtractor = factory.createNodeDataExtractor();

    const dummyDoc = parseXml("<Root/>");

    expect(objectExtractor(dummyDoc, xpath.select)).toEqual({
      numberValue: 123,
      stringValue: "str",
    });
  });
});
