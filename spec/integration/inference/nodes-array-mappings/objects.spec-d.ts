import { describe, expectTypeOf, test } from "vitest";
import {
  map,
  type ObjectBlueprint,
  type SingleNodeDataExtractorFn,
} from "../../../../src";

declare function toJson(obj: object): string;
describe("mapping to object inference", () => {
  interface TestObject {
    str: string;
    num: number;
    bool: boolean;
  }
  const defaultValue: TestObject = { str: "", num: 0, bool: false };

  const blueprint: ObjectBlueprint<TestObject> = {
    str: map().toNode("").mandatory().asString(),
    num: map().toNode("").mandatory().asNumber(),
    bool: map().toNode("").mandatory().asBoolean(),
  };

  test("regular mapping", () => {
    expectTypeOf(
      map()
        .toNodesArray("")
        .asArray()
        .ofObjects(blueprint)
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<TestObject[] | undefined>>();
  });

  test("mandatory mapping", () => {
    expectTypeOf(
      map()
        .toNodesArray("")
        .mandatory()
        .asArray()
        .ofObjects(blueprint)
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<TestObject[]>>();
  });

  test("regular mapping with default value", () => {
    expectTypeOf(
      map()
        .toNodesArray("")
        .asArray()
        .ofObjects(blueprint)
        .withDefault([defaultValue])
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<TestObject[]>>();
  });

  test("mandatory mapping with default value", () => {
    expectTypeOf(
      map()
        .toNodesArray("")
        .mandatory()
        .asArray()
        .ofObjects(blueprint)
        .withDefault([defaultValue])
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<TestObject[]>>();
  });

  test("regular mapping with conversion", () => {
    expectTypeOf(
      map()
        .toNodesArray("")
        .asArray()
        .ofObjects(blueprint)
        .withConversion(toJson)
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
  });

  test("mandatory mapping with conversion", () => {
    expectTypeOf(
      map()
        .toNodesArray("")
        .mandatory()
        .asArray()
        .ofObjects(blueprint)
        .withConversion(toJson)
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
  });

  test("regular mapping with conversion and default value", () => {
    expectTypeOf(
      map()
        .toNodesArray("")
        .asArray()
        .ofObjects(blueprint)
        .withConversion(toJson)
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
        .ofObjects(blueprint)
        .withConversion(toJson)
        .withDefault("")
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
  });

  test("regular mapping with setting conversion callback after default value", () => {
    expectTypeOf(
      map()
        .toNodesArray("")
        .asArray()
        .ofObjects(blueprint)
        .withDefault([defaultValue])
        .withConversion(toJson)
        .createNodeDataExtractor()
    ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
  });
});
