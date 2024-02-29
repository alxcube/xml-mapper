import { beforeEach, describe, expect, test } from "vitest";
import xpath from "xpath";
import {
  map,
  type SingleNodeDataExtractorFn,
  type SingleNodeDataExtractorFnFactory,
} from "../../../src";
import { parseXml } from "../../helper/parseXml";

describe("callback mappings", () => {
  const xml = `
<Root>
    <DateInAttributes year="2024" month="2" day="25"/>
    <DateInElements><Year>2024</Year><Month>02</Month><Day>25</Day></DateInElements>
</Root>
  `;

  let doc: Document;
  const xs = xpath.select;
  const getDateFromAttributes: SingleNodeDataExtractorFn<Date> = (
    node,
    xpathSelect
  ) => {
    return new Date(
      xpathSelect("number(@year)", node) as number,
      (xpathSelect("number(@month)", node) as number) - 1,
      xpathSelect("number(@day)", node) as number
    );
  };

  class TestDateExtractor implements SingleNodeDataExtractorFnFactory<Date> {
    createNodeDataExtractor(): SingleNodeDataExtractorFn<Date> {
      return (node, xpathSelect) => {
        return new Date(
          xpathSelect("number(Year)", node) as number,
          (xpathSelect("number(Month)", node) as number) - 1,
          xpathSelect("number(Day)", node) as number
        );
      };
    }
  }

  beforeEach(() => {
    doc = parseXml(xml);
  });

  describe("getting value, using callback", () => {
    test("getting date from attributes using callback", () => {
      expect(
        map()
          .toNode("//DateInAttributes")
          .callback(getDateFromAttributes)
          .createNodeDataExtractor()(doc, xs)
      ).toEqual(new Date(2024, 1, 25));
    });

    test("getting date from elements using SingleNodeDataExtractorFnFactory", () => {
      expect(
        map()
          .toNode("//DateInElements")
          .callback(new TestDateExtractor())
          .createNodeDataExtractor()(doc, xs)
      ).toEqual(new Date(2024, 1, 25));
    });
  });

  test("returning undefined, when reference node not found", () => {
    expect(
      map()
        .toNode("//MissingElement")
        .callback(getDateFromAttributes)
        .createNodeDataExtractor()(doc, xs)
    ).toBeUndefined();
  });

  test("throwing error, when mandatory reference node not found", () => {
    expect(() =>
      map()
        .toNode("//MissingElement")
        .mandatory()
        .callback(getDateFromAttributes)
        .createNodeDataExtractor()(doc, xs)
    ).toThrow();
  });

  test("returning default value, when reference node not found", () => {
    expect(
      map()
        .toNode("//MissingElement")
        .callback(getDateFromAttributes)
        .withDefault(new Date(2020, 0, 1))
        .createNodeDataExtractor()(doc, xs)
    ).toEqual(new Date(2020, 0, 1));
  });

  describe("custom value (date) conversion", () => {
    const conversionFn = (val: Date): number => val.getTime();

    test("returning converted value", () => {
      expect(
        map()
          .toNode("//DateInAttributes")
          .callback(getDateFromAttributes)
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBe(1708812000000);

      expect(
        map()
          .toNode("//DateInElements")
          .callback(new TestDateExtractor())
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBe(1708812000000);
    });

    test("returning undefined, when got conversion callback, but reference node not found", () => {
      expect(
        map()
          .toNode("//MissingElement")
          .callback(getDateFromAttributes)
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("reset default value, when conversion callback was set after default value", () => {
      expect(
        map()
          .toNode("//MissingElement")
          .callback(getDateFromAttributes)
          .withDefault(new Date())
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("return default value of converted type, when conversion callback was set and reference node not found", () => {
      expect(
        map()
          .toNode("//MissingElement")
          .callback(new TestDateExtractor())
          .withConversion(conversionFn)
          .withDefault(0)
          .createNodeDataExtractor()(doc, xs)
      ).toBe(0);
    });
  });
});
