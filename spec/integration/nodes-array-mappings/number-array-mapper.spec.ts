import { beforeEach, describe, expect, test } from "vitest";
import xpath from "xpath";
import { map } from "../../../src";
import { parseXml } from "../../helper/parseXml";

describe("number array mappings", () => {
  const xml = `
<Numbers>
    <Number value="0">0</Number>
    <Number value="-1.23">-1.23</Number>
    <Number value="Infinity">Infinity</Number>
</Numbers>
  `;
  let doc: Document;
  const xs = xpath.select;

  beforeEach(() => {
    doc = parseXml(xml);
  });

  describe("returning numbers array", () => {
    test("from attributes", () => {
      expect(
        map()
          .toNodesArray("/Numbers/Number/@value")
          .asArray()
          .ofNumbers()
          .createNodeDataExtractor()(doc, xs)
      ).toEqual([0, -1.23, Infinity]);
    });

    test("from elements", () => {
      expect(
        map()
          .toNodesArray("/Numbers/Number")
          .asArray()
          .ofNumbers()
          .createNodeDataExtractor()(doc, xs)
      ).toEqual([0, -1.23, Infinity]);
    });
  });

  describe("returning undefined", () => {
    test("when reference attributes not found", () => {
      expect(
        map()
          .toNodesArray("/Numbers/Number/@missing-value")
          .asArray()
          .ofNumbers()
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("when reference elements not found", () => {
      expect(
        map()
          .toNodesArray("/Numbers/MissingNumber")
          .asArray()
          .ofNumbers()
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });
  });

  describe("throwing error", () => {
    test("when mandatory reference attributes not found", () => {
      expect(() =>
        map()
          .toNodesArray("/Numbers/Number/@missing-value")
          .mandatory()
          .asArray()
          .ofNumbers()
          .createNodeDataExtractor()(doc, xs)
      ).toThrow();
    });

    test("when mandatory reference elements not found", () => {
      expect(() =>
        map()
          .toNodesArray("/Numbers/MissingNumber")
          .mandatory()
          .asArray()
          .ofNumbers()
          .createNodeDataExtractor()(doc, xs)
      ).toThrow();
    });
  });

  describe("returning default value", () => {
    test("when reference attributes not found", () => {
      expect(
        map()
          .toNodesArray("/Numbers/Number/@missing-value")
          .asArray()
          .ofNumbers()
          .withDefault([1])
          .createNodeDataExtractor()(doc, xs)
      ).toEqual([1]);
    });

    test("when reference elements not found", () => {
      expect(
        map()
          .toNodesArray("/Numbers/MissingNumber")
          .asArray()
          .ofNumbers()
          .withDefault([1])
          .createNodeDataExtractor()(doc, xs)
      ).toEqual([1]);
    });
  });

  describe("value conversion", () => {
    const conversionFn = (val: number[]): string[] =>
      val.map((num) => num.toFixed(2));

    test("returning converted value", () => {
      expect(
        map()
          .toNodesArray("/Numbers/Number")
          .asArray()
          .ofNumbers()
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toEqual(["0.00", "-1.23", "Infinity"]);
    });

    test("returning undefined, when got conversion callback, but reference nodes not found", () => {
      expect(
        map()
          .toNodesArray("/Numbers/MissingNumber")
          .asArray()
          .ofNumbers()
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("reset default value, when conversion callback was set after default value", () => {
      expect(
        map()
          .toNodesArray("/Numbers/MissingNumber")
          .asArray()
          .ofNumbers()
          .withDefault([1])
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("return default value of converted type, when conversion callback was set and reference node not found", () => {
      expect(
        map()
          .toNodesArray("/Numbers/MissingNumber")
          .asArray()
          .ofNumbers()
          .withConversion(conversionFn)
          .withDefault(["N/A"])
          .createNodeDataExtractor()(doc, xs)
      ).toEqual(["N/A"]);
    });
  });
});
