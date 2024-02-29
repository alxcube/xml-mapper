import { beforeEach, describe, expect, test } from "vitest";
import xpath, { type XPathSelect } from "xpath";
import {
  map,
  type SingleNodeDataExtractorFn,
  type SingleNodeDataExtractorFnFactory,
} from "../../../src";
import { parseXml } from "../../helper/parseXml";

describe("custom array mappings", () => {
  const xml = `
<Dates>
    <Date y="2024" m="2" d="25"><Year>2024</Year><Month>02</Month><Day>25</Day></Date>
    <Date y="2024" m="2" d="26"><Year>2024</Year><Month>02</Month><Day>26</Day></Date>
</Dates>
  `;
  let doc: Document;
  const xs = xpath.select;

  beforeEach(() => {
    doc = parseXml(xml);
  });

  function getDateFromAttributes(node: Node, xpathSelect: XPathSelect): Date {
    return new Date(
      xpathSelect("number(@y)", node) as number,
      (xpathSelect("number(@m)", node) as number) - 1,
      xpathSelect("number(@d)", node) as number
    );
  }

  class TestDateExtractor implements SingleNodeDataExtractorFnFactory<Date> {
    createNodeDataExtractor(): SingleNodeDataExtractorFn<Date> {
      return (node: Node, xpathSelect: XPathSelect): Date =>
        new Date(
          xpathSelect("number(Year)", node) as number,
          (xpathSelect("number(Month)", node) as number) - 1,
          xpathSelect("number(Day)", node) as number
        );
    }
  }

  const Feb_25_2024 = new Date(2024, 1, 25);
  const Feb_26_2024 = new Date(2024, 1, 26);

  describe("returning dates array", () => {
    test("using callback, from attributes", () => {
      expect(
        map()
          .toNodesArray("/Dates/Date")
          .asArray()
          .usingMapper(getDateFromAttributes)
          .createNodeDataExtractor()(doc, xs)
      ).toEqual([Feb_25_2024, Feb_26_2024]);
    });

    test("using SingleNodeDataExtractorFnFactory, from elements", () => {
      expect(
        map()
          .toNodesArray("/Dates/Date")
          .asArray()
          .usingMapper(new TestDateExtractor())
          .createNodeDataExtractor()(doc, xs)
      ).toEqual([Feb_25_2024, Feb_26_2024]);
    });
  });

  describe("returning undefined", () => {
    test("when using callback, but reference nodes not found", () => {
      expect(
        map()
          .toNodesArray("/Dates/MissingDate")
          .asArray()
          .usingMapper(getDateFromAttributes)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("when using SingleNodeDataExtractorFnFactory, but reference nodes not found", () => {
      expect(
        map()
          .toNodesArray("/Dates/MissingDate")
          .asArray()
          .usingMapper(new TestDateExtractor())
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });
  });

  describe("throwing error", () => {
    test("when using callback, but mandatory reference nodes not found", () => {
      expect(() =>
        map()
          .toNodesArray("/Dates/MissingDate")
          .mandatory()
          .asArray()
          .usingMapper(getDateFromAttributes)
          .createNodeDataExtractor()(doc, xs)
      ).toThrow();
    });

    test("when using SingleNodeDataExtractorFnFactory, but mandatory reference nodes not found", () => {
      expect(() =>
        map()
          .toNodesArray("/Dates/MissingDate")
          .mandatory()
          .asArray()
          .usingMapper(new TestDateExtractor())
          .createNodeDataExtractor()(doc, xs)
      ).toThrow();
    });
  });

  describe("returning default value", () => {
    test("when using callback, but reference nodes not found", () => {
      expect(
        map()
          .toNodesArray("/Dates/MissingDate")
          .asArray()
          .usingMapper(getDateFromAttributes)
          .withDefault([Feb_26_2024])
          .createNodeDataExtractor()(doc, xs)
      ).toEqual([Feb_26_2024]);
    });

    test("when using SingleNodeDataExtractorFnFactory, but reference nodes not found", () => {
      expect(
        map()
          .toNodesArray("/Dates/MissingDate")
          .asArray()
          .usingMapper(new TestDateExtractor())
          .withDefault([Feb_26_2024])
          .createNodeDataExtractor()(doc, xs)
      ).toEqual([Feb_26_2024]);
    });
  });

  describe("value conversion", () => {
    const conversionFn = (dates: Date[]): number[] =>
      dates.map((date) => date.getTime());

    describe("returning converted value", () => {
      test("using callback, from attributes", () => {
        expect(
          map()
            .toNodesArray("/Dates/Date")
            .asArray()
            .usingMapper(getDateFromAttributes)
            .withConversion(conversionFn)
            .createNodeDataExtractor()(doc, xs)
        ).toEqual([1708812000000, 1708898400000]);
      });

      test("using SingleNodeDataExtractorFnFactory, from elements", () => {
        expect(
          map()
            .toNodesArray("/Dates/Date")
            .asArray()
            .usingMapper(new TestDateExtractor())
            .withConversion(conversionFn)
            .createNodeDataExtractor()(doc, xs)
        ).toEqual([1708812000000, 1708898400000]);
      });
    });

    describe("returning undefined, when got conversion callback, but reference nodes not found", () => {
      test("using callback, from attributes", () => {
        expect(
          map()
            .toNodesArray("/Dates/MissingDate")
            .asArray()
            .usingMapper(getDateFromAttributes)
            .withConversion(conversionFn)
            .createNodeDataExtractor()(doc, xs)
        ).toBeUndefined();
      });

      test("using SingleNodeDataExtractorFnFactory, from elements", () => {
        expect(
          map()
            .toNodesArray("/Dates/MissingDate")
            .asArray()
            .usingMapper(new TestDateExtractor())
            .withConversion(conversionFn)
            .createNodeDataExtractor()(doc, xs)
        ).toBeUndefined();
      });
    });

    describe("reset default value, when conversion callback was set after default value", () => {
      test("using callback, from attributes", () => {
        expect(
          map()
            .toNodesArray("/Dates/MissingDate")
            .asArray()
            .usingMapper(getDateFromAttributes)
            .withDefault([Feb_26_2024])
            .withConversion(conversionFn)
            .createNodeDataExtractor()(doc, xs)
        ).toBeUndefined();
      });

      test("using SingleNodeDataExtractorFnFactory, from elements", () => {
        expect(
          map()
            .toNodesArray("/Dates/MissingDate")
            .asArray()
            .usingMapper(new TestDateExtractor())
            .withDefault([Feb_26_2024])
            .withConversion(conversionFn)
            .createNodeDataExtractor()(doc, xs)
        ).toBeUndefined();
      });
    });

    describe("return default value of converted type, when conversion callback was set and reference node not found", () => {
      test("using callback, from attributes", () => {
        expect(
          map()
            .toNodesArray("/Dates/MissingDate")
            .asArray()
            .usingMapper(getDateFromAttributes)
            .withConversion(conversionFn)
            .withDefault([1])
            .createNodeDataExtractor()(doc, xs)
        ).toEqual([1]);
      });

      test("using SingleNodeDataExtractorFnFactory, from elements", () => {
        expect(
          map()
            .toNodesArray("/Dates/MissingDate")
            .asArray()
            .usingMapper(new TestDateExtractor())
            .withConversion(conversionFn)
            .withDefault([1])
            .createNodeDataExtractor()(doc, xs)
        ).toEqual([1]);
      });
    });
  });
});
