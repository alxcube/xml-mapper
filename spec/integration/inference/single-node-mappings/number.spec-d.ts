import { describe, expectTypeOf, test } from "vitest";
import { map, type SingleNodeDataExtractorFn } from "../../../../src";

describe("mapping to number inference", () => {
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
