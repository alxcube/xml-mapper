import { beforeEach, describe, expect, test } from "vitest";
import xpath from "xpath";
import {
  map,
  type NodesArrayDataExtractorFn,
  type NodesArrayDataExtractorFnFactory,
} from "../../../src";
import { parseXml } from "../../helper/parseXml";

describe("custom array data extraction", () => {
  const xml = `
<Numbers>
    <Number>1</Number>
    <Number>2</Number>
    <Number>3</Number>
    <Number>4</Number> 
</Numbers>
  `;

  let doc: Document;
  const xs = xpath.select;

  beforeEach(() => {
    doc = parseXml(xml);
  });

  const sumExtractor: NodesArrayDataExtractorFn<number> = (
    nodes,
    xpathSelect
  ) =>
    nodes.reduce(
      (sum, node) => sum + (xpathSelect("number(.)", node) as number),
      0
    );

  class TestProductExtractor
    implements NodesArrayDataExtractorFnFactory<number>
  {
    createNodesArrayDataExtractor(): NodesArrayDataExtractorFn<number> {
      return (nodes, xpathSelect) =>
        nodes.reduce(
          (product, node) =>
            product * (xpathSelect("number(.)", node) as number),
          1
        );
    }
  }

  describe("returning extracted value", () => {
    test("returning sum of node values, using callback", () => {
      expect(
        map()
          .toElementsArray("/Numbers/Number")
          .callback(sumExtractor)
          .createNodeDataExtractor()(doc, xs)
      ).toBe(10);
    });

    test("returning product of node values, using NodesArrayDataExtractorFnFactory", () => {
      expect(
        map()
          .toElementsArray("/Numbers/Number")
          .callback(new TestProductExtractor())
          .createNodeDataExtractor()(doc, xs)
      ).toBe(24);
    });
  });

  describe("returning undefined, when reference nodes not found", () => {
    test("when using callback", () => {
      expect(
        map()
          .toElementsArray("/MissingNumbers/Number")
          .callback(sumExtractor)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("when using NodesArrayDataExtractorFnFactory", () => {
      expect(
        map()
          .toElementsArray("/MissingNumbers/Number")
          .callback(new TestProductExtractor())
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });
  });

  describe("throwing error, when mandatory reference nodes not found", () => {
    test("when using callback", () => {
      expect(() =>
        map()
          .toElementsArray("/MissingNumbers/Number")
          .mandatory()
          .callback(sumExtractor)
          .createNodeDataExtractor()(doc, xs)
      ).toThrow();
    });

    test("when using NodesArrayDataExtractorFnFactory", () => {
      expect(() =>
        map()
          .toElementsArray("/MissingNumbers/Number")
          .mandatory()
          .callback(new TestProductExtractor())
          .createNodeDataExtractor()(doc, xs)
      ).toThrow();
    });
  });

  describe("returning default value, when reference nodes not found", () => {
    test("when using callback", () => {
      expect(
        map()
          .toElementsArray("/MissingNumbers/Number")
          .callback(sumExtractor)
          .withDefault(0)
          .createNodeDataExtractor()(doc, xs)
      ).toBe(0);
    });

    test("when using NodesArrayDataExtractorFnFactory", () => {
      expect(
        map()
          .toElementsArray("/MissingNumbers/Number")
          .callback(new TestProductExtractor())
          .withDefault(0)
          .createNodeDataExtractor()(doc, xs)
      ).toBe(0);
    });
  });

  describe("value conversion", () => {
    const conversionFn = (num: number): string => num.toFixed(2);

    describe("returning converted value", () => {
      test("returning sum of node values, using callback", () => {
        expect(
          map()
            .toElementsArray("/Numbers/Number")
            .callback(sumExtractor)
            .withConversion(conversionFn)
            .createNodeDataExtractor()(doc, xs)
        ).toBe("10.00");
      });

      test("returning product of node values, using NodesArrayDataExtractorFnFactory", () => {
        expect(
          map()
            .toElementsArray("/Numbers/Number")
            .callback(new TestProductExtractor())
            .withConversion(conversionFn)
            .createNodeDataExtractor()(doc, xs)
        ).toBe("24.00");
      });
    });

    describe("returning undefined, when got conversion callback, but reference nodes not found", () => {
      test("when using callback", () => {
        expect(
          map()
            .toElementsArray("/MissingNumbers/Number")
            .callback(sumExtractor)
            .withConversion(conversionFn)
            .createNodeDataExtractor()(doc, xs)
        ).toBeUndefined();
      });

      test("when using NodesArrayDataExtractorFnFactory", () => {
        expect(
          map()
            .toElementsArray("/MissingNumbers/Number")
            .callback(new TestProductExtractor())
            .withConversion(conversionFn)
            .createNodeDataExtractor()(doc, xs)
        ).toBeUndefined();
      });
    });

    describe("reset default value, when conversion callback was set after default value", () => {
      test("when using callback", () => {
        expect(
          map()
            .toElementsArray("/MissingNumbers/Number")
            .callback(sumExtractor)
            .withDefault(0)
            .withConversion(conversionFn)
            .createNodeDataExtractor()(doc, xs)
        ).toBeUndefined();
      });

      test("when using NodesArrayDataExtractorFnFactory", () => {
        expect(
          map()
            .toElementsArray("/MissingNumbers/Number")
            .callback(new TestProductExtractor())
            .withDefault(0)
            .withConversion(conversionFn)
            .createNodeDataExtractor()(doc, xs)
        ).toBeUndefined();
      });
    });

    describe("return default value of converted type, when conversion callback was set and reference node not found", () => {
      test("when using callback", () => {
        expect(
          map()
            .toElementsArray("/MissingNumbers/Number")
            .callback(sumExtractor)
            .withConversion(conversionFn)
            .withDefault("")
            .createNodeDataExtractor()(doc, xs)
        ).toBe("");
      });

      test("when using NodesArrayDataExtractorFnFactory", () => {
        expect(
          map()
            .toElementsArray("/MissingNumbers/Number")
            .callback(new TestProductExtractor())
            .withConversion(conversionFn)
            .withDefault("")
            .createNodeDataExtractor()(doc, xs)
        ).toBe("");
      });
    });
  });
});
