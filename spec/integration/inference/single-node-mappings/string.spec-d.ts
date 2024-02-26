import { describe, expectTypeOf, test } from "vitest";
import { map, type SingleNodeDataExtractorFn } from "../../../../src";

describe("mapping to string inference", () => {
  describe("attribute mapping", () => {
    test("regular mapping", () => {
      expectTypeOf(
        map().toAttribute("").asString().createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("mandatory mapping", () => {
      expectTypeOf(
        map().toAttribute("").mandatory().asString().createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with default value", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .asString()
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with default value", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .mandatory()
          .asString()
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .asString()
          .withConversion(parseFloat)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number | undefined>>();
    });

    test("mandatory mapping with conversion", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .mandatory()
          .asString()
          .withConversion(parseFloat)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number>>();
    });

    test("regular mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .asString()
          .withConversion(parseFloat)
          .withDefault(0)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number>>();
    });

    test("mandatory mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .mandatory()
          .asString()
          .withConversion(parseFloat)
          .withDefault(0)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number>>();
    });

    test("regular mapping with setting conversion callback after default value", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .asString()
          .withDefault("")
          .withConversion(parseFloat)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number | undefined>>();
    });
  });

  describe("element mapping", () => {
    test("regular mapping", () => {
      expectTypeOf(
        map().toElement("").asString().createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("mandatory mapping", () => {
      expectTypeOf(
        map().toElement("").mandatory().asString().createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with default value", () => {
      expectTypeOf(
        map().toElement("").asString().withDefault("").createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with default value", () => {
      expectTypeOf(
        map()
          .toElement("")
          .mandatory()
          .asString()
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion", () => {
      expectTypeOf(
        map()
          .toElement("")
          .asString()
          .withConversion(parseFloat)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number | undefined>>();
    });

    test("mandatory mapping with conversion", () => {
      expectTypeOf(
        map()
          .toElement("")
          .mandatory()
          .asString()
          .withConversion(parseFloat)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number>>();
    });

    test("regular mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toElement("")
          .asString()
          .withConversion(parseFloat)
          .withDefault(0)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number>>();
    });

    test("mandatory mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toElement("")
          .mandatory()
          .asString()
          .withConversion(parseFloat)
          .withDefault(0)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number>>();
    });

    test("regular mapping with setting conversion callback after default value", () => {
      expectTypeOf(
        map()
          .toElement("")
          .asString()
          .withDefault("")
          .withConversion(parseFloat)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number | undefined>>();
    });
  });

  describe("node mapping", () => {
    test("regular mapping", () => {
      expectTypeOf(
        map().toNode("").asString().createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("mandatory mapping", () => {
      expectTypeOf(
        map().toNode("").mandatory().asString().createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with default value", () => {
      expectTypeOf(
        map().toNode("").asString().withDefault("").createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with default value", () => {
      expectTypeOf(
        map()
          .toNode("")
          .mandatory()
          .asString()
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion", () => {
      expectTypeOf(
        map()
          .toNode("")
          .asString()
          .withConversion(parseFloat)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number | undefined>>();
    });

    test("mandatory mapping with conversion", () => {
      expectTypeOf(
        map()
          .toNode("")
          .mandatory()
          .asString()
          .withConversion(parseFloat)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number>>();
    });

    test("regular mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toNode("")
          .asString()
          .withConversion(parseFloat)
          .withDefault(0)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number>>();
    });

    test("mandatory mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toNode("")
          .mandatory()
          .asString()
          .withConversion(parseFloat)
          .withDefault(0)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number>>();
    });

    test("regular mapping with setting conversion callback after default value", () => {
      expectTypeOf(
        map()
          .toNode("")
          .asString()
          .withDefault("")
          .withConversion(parseFloat)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number | undefined>>();
    });
  });
});
