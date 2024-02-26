import { describe, expectTypeOf, test } from "vitest";
import { map, type SingleNodeDataExtractorFn } from "../../../../src";

describe("mapping to boolean inference", () => {
  describe("attribute mapping", () => {
    test("regular mapping", () => {
      expectTypeOf(
        map().toAttribute("").asBoolean().createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean | undefined>>();
    });

    test("mandatory mapping", () => {
      expectTypeOf(
        map().toAttribute("").mandatory().asBoolean().createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean>>();
    });

    test("regular mapping with default value", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .asBoolean()
          .withDefault(false)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean>>();
    });

    test("mandatory mapping with default value", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .mandatory()
          .asBoolean()
          .withDefault(false)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean>>();
    });

    test("regular mapping with conversion", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .asBoolean()
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("mandatory mapping with conversion", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .mandatory()
          .asBoolean()
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .asBoolean()
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
          .asBoolean()
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with setting conversion callback after default value", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .asBoolean()
          .withDefault(false)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });
  });

  describe("element mapping", () => {
    test("regular mapping", () => {
      expectTypeOf(
        map().toElement("").asBoolean().createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean | undefined>>();
    });

    test("mandatory mapping", () => {
      expectTypeOf(
        map().toElement("").mandatory().asBoolean().createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean>>();
    });

    test("regular mapping with default value", () => {
      expectTypeOf(
        map()
          .toElement("")
          .asBoolean()
          .withDefault(false)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean>>();
    });

    test("mandatory mapping with default value", () => {
      expectTypeOf(
        map()
          .toElement("")
          .mandatory()
          .asBoolean()
          .withDefault(false)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean>>();
    });

    test("regular mapping with conversion", () => {
      expectTypeOf(
        map()
          .toElement("")
          .asBoolean()
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("mandatory mapping with conversion", () => {
      expectTypeOf(
        map()
          .toElement("")
          .mandatory()
          .asBoolean()
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toElement("")
          .asBoolean()
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
          .asBoolean()
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with setting conversion callback after default value", () => {
      expectTypeOf(
        map()
          .toElement("")
          .asBoolean()
          .withDefault(false)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });
  });

  describe("node mapping", () => {
    test("regular mapping", () => {
      expectTypeOf(
        map().toNode("").asBoolean().createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean | undefined>>();
    });

    test("mandatory mapping", () => {
      expectTypeOf(
        map().toNode("").mandatory().asBoolean().createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean>>();
    });

    test("regular mapping with default value", () => {
      expectTypeOf(
        map()
          .toNode("")
          .asBoolean()
          .withDefault(false)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean>>();
    });

    test("mandatory mapping with default value", () => {
      expectTypeOf(
        map()
          .toNode("")
          .mandatory()
          .asBoolean()
          .withDefault(false)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean>>();
    });

    test("regular mapping with conversion", () => {
      expectTypeOf(
        map()
          .toNode("")
          .asBoolean()
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("mandatory mapping with conversion", () => {
      expectTypeOf(
        map()
          .toNode("")
          .mandatory()
          .asBoolean()
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toNode("")
          .asBoolean()
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
          .asBoolean()
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with setting conversion callback after default value", () => {
      expectTypeOf(
        map()
          .toNode("")
          .asBoolean()
          .withDefault(false)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });
  });
});
