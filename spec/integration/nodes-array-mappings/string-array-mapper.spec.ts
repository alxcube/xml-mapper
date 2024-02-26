import { beforeEach, describe, expect, test } from "vitest";
import xpath from "xpath";
import { map } from "../../../src";
import { parseXml } from "../../helper/parseXml";

describe("string array mappings", () => {
  const xml = `
<Users>
    <User id="ABC">John Doe</User>
    <User id="DEF">Jane Doe</User>
</Users>
  `;

  let doc: Document;
  const xs = xpath.select;

  beforeEach(() => {
    doc = parseXml(xml);
  });

  describe("returning array of strings", () => {
    test("from attributes array", () => {
      expect(
        map()
          .toAttributesArray("/Users/User/@id")
          .asArray()
          .ofStrings()
          .createNodeDataExtractor()(doc, xs)
      ).toEqual(["ABC", "DEF"]);
    });

    test("from elements array", () => {
      expect(
        map()
          .toElementsArray("/Users/User")
          .asArray()
          .ofStrings()
          .createNodeDataExtractor()(doc, xs)
      ).toEqual(["John Doe", "Jane Doe"]);
    });
  });

  describe("returning undefined", () => {
    test("when reference attributes not found", () => {
      expect(
        map()
          .toAttributesArray("/Users/User/@missing-attribute")
          .asArray()
          .ofStrings()
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("when reference elements not found", () => {
      expect(
        map()
          .toElementsArray("/Users/User/MissingElement")
          .asArray()
          .ofStrings()
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });
  });

  describe("throwing error", () => {
    test("when mandatory reference attributes not found", () => {
      expect(() =>
        map()
          .toAttributesArray("/Users/User/@missing-attribute")
          .mandatory()
          .asArray()
          .ofStrings()
          .createNodeDataExtractor()(doc, xs)
      ).toThrow();
    });

    test("when mandatory reference elements not found", () => {
      expect(() =>
        map()
          .toElementsArray("/Users/User/MissingElement")
          .mandatory()
          .asArray()
          .ofStrings()
          .createNodeDataExtractor()(doc, xs)
      ).toThrow();
    });
  });

  describe("returning default value", () => {
    test("when reference attributes not found", () => {
      expect(
        map()
          .toAttributesArray("/Users/User/@missing-attribute")
          .asArray()
          .ofStrings()
          .withDefault(["fallback"])
          .createNodeDataExtractor()(doc, xs)
      ).toEqual(["fallback"]);
    });

    test("when reference elements not found", () => {
      expect(
        map()
          .toElementsArray("/Users/User/MissingElement")
          .asArray()
          .ofStrings()
          .withDefault(["fallback"])
          .createNodeDataExtractor()(doc, xs)
      ).toEqual(["fallback"]);
    });
  });

  describe("value conversion", () => {
    const conversionFn = (val: string[]): string => val.join(", ");

    test("returning converted value", () => {
      expect(
        map()
          .toAttributesArray("/Users/User/@id")
          .asArray()
          .ofStrings()
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBe("ABC, DEF");

      expect(
        map()
          .toElementsArray("/Users/User")
          .asArray()
          .ofStrings()
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBe("John Doe, Jane Doe");
    });

    test("returning undefined, when got conversion callback, but reference nodes not found", () => {
      expect(
        map()
          .toElementsArray("/Users/User/MissingElement")
          .asArray()
          .ofStrings()
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("reset default value, when conversion callback was set after default value", () => {
      expect(
        map()
          .toElementsArray("/Users/User/MissingElement")
          .asArray()
          .ofStrings()
          .withDefault(["fallback"])
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("return default value of converted type, when conversion callback was set and reference node not found", () => {
      expect(
        map()
          .toElementsArray("/Users/User/MissingElement")
          .asArray()
          .ofStrings()
          .withConversion(conversionFn)
          .withDefault("")
          .createNodeDataExtractor()(doc, xs)
      ).toBe("");
    });
  });
});
