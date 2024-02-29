import { describe, expectTypeOf, test } from "vitest";
import {
  map,
  type RecursiveObjectFactory,
  type SingleNodeDataExtractorFn,
} from "../../../../src";

declare function toJson(obj: object): string;
describe("mapping to object inference", () => {
  interface TestRecursiveObject {
    title: string;
    child?: TestRecursiveObject;
  }
  const defaultValue: TestRecursiveObject = { title: "" };

  const recursiveObjectFactory: RecursiveObjectFactory<TestRecursiveObject> = (
    recursion
  ) => ({
    title: map().toNode("").mandatory().asString(),
    child: map().toNode("").asRecursiveObject(recursion),
  });

  test("regular mapping", () => {
    expectTypeOf(
      map()
        .toNode("")
        .asRecursiveObject(recursiveObjectFactory)
        .createNodeDataExtractor()
    ).toEqualTypeOf<
      SingleNodeDataExtractorFn<TestRecursiveObject | undefined>
    >();
  });

  test("mandatory mapping", () => {
    expectTypeOf(
      map()
        .toNode("")
        .mandatory()
        .asRecursiveObject(recursiveObjectFactory)
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<TestRecursiveObject>>();
  });

  test("regular mapping with default value", () => {
    expectTypeOf(
      map()
        .toNode("")
        .asRecursiveObject(recursiveObjectFactory)
        .withDefault(defaultValue)
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<TestRecursiveObject>>();
  });

  test("mandatory mapping with default value", () => {
    expectTypeOf(
      map()
        .toNode("")
        .mandatory()
        .asRecursiveObject(recursiveObjectFactory)
        .withDefault(defaultValue)
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<TestRecursiveObject>>();
  });

  test("regular mapping with conversion", () => {
    expectTypeOf(
      map()
        .toNode("")
        .asRecursiveObject(recursiveObjectFactory)
        .withConversion(toJson)
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
  });

  test("mandatory mapping with conversion", () => {
    expectTypeOf(
      map()
        .toNode("")
        .mandatory()
        .asRecursiveObject(recursiveObjectFactory)
        .withConversion(toJson)
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
  });

  test("regular mapping with conversion and default value", () => {
    expectTypeOf(
      map()
        .toNode("")
        .asRecursiveObject(recursiveObjectFactory)
        .withConversion(toJson)
        .withDefault("")
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
  });

  test("mandatory mapping with conversion and default value", () => {
    expectTypeOf(
      map()
        .toNode("")
        .mandatory()
        .asRecursiveObject(recursiveObjectFactory)
        .withConversion(toJson)
        .withDefault("")
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
  });

  test("regular mapping with setting conversion callback after default value", () => {
    expectTypeOf(
      map()
        .toNode("")
        .asRecursiveObject(recursiveObjectFactory)
        .withDefault(defaultValue)
        .withConversion(toJson)
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
  });
});
