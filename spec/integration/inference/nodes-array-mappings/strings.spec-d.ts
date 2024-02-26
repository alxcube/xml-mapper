import { describe, expectTypeOf, test } from "vitest";
import { map, type SingleNodeDataExtractorFn } from "../../../../src";

declare function toNumbersArray(val: string[]): number[];
describe("mapping to string inference", () => {
  describe("attribute mapping", () => {
    test("regular mapping", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .asArray()
          .ofStrings()
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string[] | undefined>>();
    });

    test("mandatory mapping", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .mandatory()
          .asArray()
          .ofStrings()
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string[]>>();
    });

    test("regular mapping with default value", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .asArray()
          .ofStrings()
          .withDefault([""])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string[]>>();
    });

    test("mandatory mapping with default value", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .mandatory()
          .asArray()
          .ofStrings()
          .withDefault([""])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string[]>>();
    });

    test("regular mapping with conversion", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .asArray()
          .ofStrings()
          .withConversion(toNumbersArray)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number[] | undefined>>();
    });

    test("mandatory mapping with conversion", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .mandatory()
          .asArray()
          .ofStrings()
          .withConversion(toNumbersArray)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number[]>>();
    });

    test("regular mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .asArray()
          .ofStrings()
          .withConversion(toNumbersArray)
          .withDefault([0])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number[]>>();
    });

    test("mandatory mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .mandatory()
          .asArray()
          .ofStrings()
          .withConversion(toNumbersArray)
          .withDefault([0])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number[]>>();
    });

    test("regular mapping with setting conversion callback after default value", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .asArray()
          .ofStrings()
          .withDefault([""])
          .withConversion(toNumbersArray)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number[] | undefined>>();
    });
  });

  describe("element mapping", () => {
    test("regular mapping", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .asArray()
          .ofStrings()
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string[] | undefined>>();
    });

    test("mandatory mapping", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .mandatory()
          .asArray()
          .ofStrings()
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string[]>>();
    });

    test("regular mapping with default value", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .asArray()
          .ofStrings()
          .withDefault([""])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string[]>>();
    });

    test("mandatory mapping with default value", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .mandatory()
          .asArray()
          .ofStrings()
          .withDefault([""])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string[]>>();
    });

    test("regular mapping with conversion", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .asArray()
          .ofStrings()
          .withConversion(toNumbersArray)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number[] | undefined>>();
    });

    test("mandatory mapping with conversion", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .mandatory()
          .asArray()
          .ofStrings()
          .withConversion(toNumbersArray)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number[]>>();
    });

    test("regular mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .asArray()
          .ofStrings()
          .withConversion(toNumbersArray)
          .withDefault([0])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number[]>>();
    });

    test("mandatory mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .mandatory()
          .asArray()
          .ofStrings()
          .withConversion(toNumbersArray)
          .withDefault([0])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number[]>>();
    });

    test("regular mapping with setting conversion callback after default value", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .asArray()
          .ofStrings()
          .withDefault([""])
          .withConversion(toNumbersArray)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number[] | undefined>>();
    });
  });

  describe("node mapping", () => {
    test("regular mapping", () => {
      expectTypeOf(
        map().toNodesArray("").asArray().ofStrings().createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string[] | undefined>>();
    });

    test("mandatory mapping", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .mandatory()
          .asArray()
          .ofStrings()
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string[]>>();
    });

    test("regular mapping with default value", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .asArray()
          .ofStrings()
          .withDefault([""])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string[]>>();
    });

    test("mandatory mapping with default value", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .mandatory()
          .asArray()
          .ofStrings()
          .withDefault([""])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string[]>>();
    });

    test("regular mapping with conversion", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .asArray()
          .ofStrings()
          .withConversion(toNumbersArray)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number[] | undefined>>();
    });

    test("mandatory mapping with conversion", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .mandatory()
          .asArray()
          .ofStrings()
          .withConversion(toNumbersArray)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number[]>>();
    });

    test("regular mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .asArray()
          .ofStrings()
          .withConversion(toNumbersArray)
          .withDefault([0])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number[]>>();
    });

    test("mandatory mapping with conversion and default value", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .mandatory()
          .asArray()
          .ofStrings()
          .withConversion(toNumbersArray)
          .withDefault([0])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number[]>>();
    });

    test("regular mapping with setting conversion callback after default value", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .asArray()
          .ofStrings()
          .withDefault([""])
          .withConversion(toNumbersArray)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<number[] | undefined>>();
    });
  });
});
