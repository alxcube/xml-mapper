import { describe, expectTypeOf, test } from "vitest";
import { map, type SingleNodeDataExtractorFn } from "../../../../src";

describe("mapping to boolean inference", () => {
  test("regular mapping", () => {
    expectTypeOf(
      map().toNodesArray("").asArray().ofBooleans().createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean[] | undefined>>();
  });

  test("mandatory mapping", () => {
    expectTypeOf(
      map()
        .toNodesArray("")
        .mandatory()
        .asArray()
        .ofBooleans()
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean[]>>();
  });

  test("regular mapping with default value", () => {
    expectTypeOf(
      map()
        .toNodesArray("")
        .asArray()
        .ofBooleans()
        .withDefault([false as boolean])
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean[]>>();
  });

  test("mandatory mapping with default value", () => {
    expectTypeOf(
      map()
        .toNodesArray("")
        .mandatory()
        .asArray()
        .ofBooleans()
        .withDefault([false])
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean[]>>();
  });

  test("regular mapping with conversion", () => {
    expectTypeOf(
      map()
        .toNodesArray("")
        .asArray()
        .ofBooleans()
        .withConversion(String)
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
  });

  test("mandatory mapping with conversion", () => {
    expectTypeOf(
      map()
        .toNodesArray("")
        .mandatory()
        .asArray()
        .ofBooleans()
        .withConversion(String)
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
  });

  test("regular mapping with conversion and default value", () => {
    expectTypeOf(
      map()
        .toNodesArray("")
        .asArray()
        .ofBooleans()
        .withConversion(String)
        .withDefault("")
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
  });

  test("mandatory mapping with conversion and default value", () => {
    expectTypeOf(
      map()
        .toNodesArray("")
        .mandatory()
        .asArray()
        .ofBooleans()
        .withConversion(String)
        .withDefault("")
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
  });

  test("regular mapping with setting conversion callback after default value", () => {
    expectTypeOf(
      map()
        .toNodesArray("")
        .asArray()
        .ofBooleans()
        .withDefault([false])
        .withConversion(String)
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
  });

  test("empty array as default value", () => {
    expectTypeOf(
      map()
        .toNodesArray("")
        .asArray()
        .ofBooleans()
        .withDefault([])
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean[]>>();
  });
});
