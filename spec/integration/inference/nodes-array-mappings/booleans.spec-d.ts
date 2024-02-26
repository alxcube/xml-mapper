import { describe, expectTypeOf, test } from "vitest";
import { map, type SingleNodeDataExtractorFn } from "../../../../src";

describe("attribute mapping", () => {
  test("regular mapping", () => {
    expectTypeOf(
      map()
        .toAttributesArray("")
        .asArray()
        .ofBooleans()
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean[] | undefined>>();
  });

  test("mandatory mapping", () => {
    expectTypeOf(
      map()
        .toAttributesArray("")
        .mandatory()
        .asArray()
        .ofBooleans()
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean[]>>();
  });

  test("regular mapping with default value", () => {
    expectTypeOf(
      map()
        .toAttributesArray("")
        .asArray()
        .ofBooleans()
        .withDefault([false as boolean])
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean[]>>();
  });

  test("mandatory mapping with default value", () => {
    expectTypeOf(
      map()
        .toAttributesArray("")
        .mandatory()
        .asArray()
        .ofBooleans()
        .withDefault([false as boolean])
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean[]>>();
  });

  test("regular mapping with conversion", () => {
    expectTypeOf(
      map()
        .toAttributesArray("")
        .asArray()
        .ofBooleans()
        .withConversion(String)
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
  });

  test("mandatory mapping with conversion", () => {
    expectTypeOf(
      map()
        .toAttributesArray("")
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
        .toAttributesArray("")
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
        .toAttributesArray("")
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
        .toAttributesArray("")
        .asArray()
        .ofBooleans()
        .withDefault([false as boolean])
        .withConversion(String)
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
  });
});

describe("element mapping", () => {
  test("regular mapping", () => {
    expectTypeOf(
      map().toElementsArray("").asArray().ofBooleans().createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean[] | undefined>>();
  });

  test("mandatory mapping", () => {
    expectTypeOf(
      map()
        .toElementsArray("")
        .mandatory()
        .asArray()
        .ofBooleans()
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean[]>>();
  });

  test("regular mapping with default value", () => {
    expectTypeOf(
      map()
        .toElementsArray("")
        .asArray()
        .ofBooleans()
        .withDefault([false as boolean])
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean[]>>();
  });

  test("mandatory mapping with default value", () => {
    expectTypeOf(
      map()
        .toElementsArray("")
        .mandatory()
        .asArray()
        .ofBooleans()
        .withDefault([false as boolean])
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<boolean[]>>();
  });

  test("regular mapping with conversion", () => {
    expectTypeOf(
      map()
        .toElementsArray("")
        .asArray()
        .ofBooleans()
        .withConversion(String)
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
  });

  test("mandatory mapping with conversion", () => {
    expectTypeOf(
      map()
        .toElementsArray("")
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
        .toElementsArray("")
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
        .toElementsArray("")
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
        .toElementsArray("")
        .asArray()
        .ofBooleans()
        .withDefault([false])
        .withConversion(String)
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
  });
});

describe("node mapping", () => {
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
});
