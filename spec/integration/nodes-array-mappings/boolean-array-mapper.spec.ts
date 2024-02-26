import { beforeEach, describe, expect, test } from "vitest";
import xpath from "xpath";
import { map } from "../../../src";
import { parseXml } from "../../helper/parseXml";

describe("boolean array mappings", () => {
  const xml = `
<Root>
    <Booleans>
        <Boolean value="1">true</Boolean>
        <Boolean value="0">false</Boolean>
    </Booleans>
</Root>
  `;

  let doc: Document;
  const xs = xpath.select;

  beforeEach(() => {
    doc = parseXml(xml);
  });

  describe("returning booleans array", () => {
    test("from attributes", () => {
      expect(
        map()
          .toAttributesArray("//Booleans/Boolean/@value")
          .asArray()
          .ofBooleans()
          .createNodeDataExtractor()(doc, xs)
      ).toEqual([true, false]);
    });

    test("from elements", () => {
      expect(
        map()
          .toElementsArray("//Booleans/Boolean")
          .asArray()
          .ofBooleans()
          .createNodeDataExtractor()(doc, xs)
      ).toEqual([true, false]);
    });
  });

  describe("returning undefined", () => {
    test("when reference attributes not found", () => {
      expect(
        map()
          .toAttributesArray("//Booleans/Boolean/@missing-bool")
          .asArray()
          .ofBooleans()
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("when reference elements not found", () => {
      expect(
        map()
          .toElementsArray("//Booleans/Boolean/MissingElement")
          .asArray()
          .ofBooleans()
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });
  });

  describe("throwing error", () => {
    test("when mandatory reference attributes not found", () => {
      expect(() =>
        map()
          .toAttributesArray("//Booleans/Boolean/@missing-bool")
          .mandatory()
          .asArray()
          .ofBooleans()
          .createNodeDataExtractor()(doc, xs)
      ).toThrow();
    });

    test("when mandatory reference elements not found", () => {
      expect(() =>
        map()
          .toElementsArray("//Booleans/Boolean/MissingElement")
          .mandatory()
          .asArray()
          .ofBooleans()
          .createNodeDataExtractor()(doc, xs)
      ).toThrow();
    });
  });

  describe("returning default value", () => {
    test("when reference attributes not found", () => {
      expect(
        map()
          .toAttributesArray("//Booleans/Boolean/@missing-bool")
          .asArray()
          .ofBooleans()
          .withDefault([true])
          .createNodeDataExtractor()(doc, xs)
      ).toEqual([true]);
    });

    test("when reference elements not found", () => {
      expect(
        map()
          .toElementsArray("//Booleans/Boolean/MissingElement")
          .asArray()
          .ofBooleans()
          .withDefault([true])
          .createNodeDataExtractor()(doc, xs)
      ).toEqual([true]);
    });
  });

  describe("value conversion", () => {
    const conversionFn = (val: boolean[]): string[] =>
      val.map((bool) => (bool ? "On" : "Off"));

    test("returning converted value", () => {
      expect(
        map()
          .toElementsArray("//Booleans/Boolean")
          .asArray()
          .ofBooleans()
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toEqual(["On", "Off"]);
    });

    test("returning undefined, when got conversion callback, but reference nodes not found", () => {
      expect(
        map()
          .toElementsArray("//Booleans/Boolean/MissingElement")
          .asArray()
          .ofBooleans()
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("reset default value, when conversion callback was set after default value", () => {
      expect(
        map()
          .toElementsArray("//Booleans/Boolean/MissingElement")
          .asArray()
          .ofBooleans()
          .withDefault([true])
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("return default value of converted type, when conversion callback was set and reference node not found", () => {
      expect(
        map()
          .toElementsArray("//Booleans/Boolean/MissingElement")
          .asArray()
          .ofBooleans()
          .withConversion(conversionFn)
          .withDefault(["On"])
          .createNodeDataExtractor()(doc, xs)
      ).toEqual(["On"]);
    });
  });
});
