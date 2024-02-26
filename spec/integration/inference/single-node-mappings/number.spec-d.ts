import { describe, expectTypeOf, test } from "vitest";
import { map, type SingleNodeDataExtractorFn } from "../../../../src";

describe("mapping to number inference", () => {
  describe("attribute mapping", () => {
    test("regular mapping", () => {
      expectTypeOf(
        map().toAttribute("").asNumber().createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number | undefined>>();
    });

    test("mandatory mapping", () => {
      expectTypeOf(
        map().toAttribute("").mandatory().asNumber().createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number>>();
    });

    test("regular mapping with default value", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .asNumber()
          .withDefault(0)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number>>();
    });

    test("mandatory mapping with default value", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .mandatory()
          .asNumber()
          .withDefault(0)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number>>();
    });

    test("regular mapping with conversion", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .asNumber()
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("mandatory mapping with conversion", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .mandatory()
          .asNumber()
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .asNumber()
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .mandatory()
          .asNumber()
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with setting conversion callback after default value", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .asNumber()
          .withDefault(0)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });
  });

  describe("element mapping", () => {
    test("regular mapping", () => {
      expectTypeOf(
        map().toElement("").asNumber().createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number | undefined>>();
    });

    test("mandatory mapping", () => {
      expectTypeOf(
        map().toElement("").mandatory().asNumber().createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number>>();
    });

    test("regular mapping with default value", () => {
      expectTypeOf(
        map().toElement("").asNumber().withDefault(0).createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number>>();
    });

    test("mandatory mapping with default value", () => {
      expectTypeOf(
        map()
          .toElement("")
          .mandatory()
          .asNumber()
          .withDefault(0)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number>>();
    });

    test("regular mapping with conversion", () => {
      expectTypeOf(
        map()
          .toElement("")
          .asNumber()
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("mandatory mapping with conversion", () => {
      expectTypeOf(
        map()
          .toElement("")
          .mandatory()
          .asNumber()
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toElement("")
          .asNumber()
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toElement("")
          .mandatory()
          .asNumber()
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with setting conversion callback after default value", () => {
      expectTypeOf(
        map()
          .toElement("")
          .asNumber()
          .withDefault(0)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });
  });

  describe("node mapping", () => {
    test("regular mapping", () => {
      expectTypeOf(
        map().toNode("").asNumber().createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number | undefined>>();
    });

    test("mandatory mapping", () => {
      expectTypeOf(
        map().toNode("").mandatory().asNumber().createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number>>();
    });

    test("regular mapping with default value", () => {
      expectTypeOf(
        map().toNode("").asNumber().withDefault(0).createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number>>();
    });

    test("mandatory mapping with default value", () => {
      expectTypeOf(
        map()
          .toNode("")
          .mandatory()
          .asNumber()
          .withDefault(0)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number>>();
    });

    test("regular mapping with conversion", () => {
      expectTypeOf(
        map()
          .toNode("")
          .asNumber()
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("mandatory mapping with conversion", () => {
      expectTypeOf(
        map()
          .toNode("")
          .mandatory()
          .asNumber()
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toNode("")
          .asNumber()
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toNode("")
          .mandatory()
          .asNumber()
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with setting conversion callback after default value", () => {
      expectTypeOf(
        map()
          .toNode("")
          .asNumber()
          .withDefault(0)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });
  });
});
