import { describe, expectTypeOf, test } from "vitest";
import type { XPathSelect } from "xpath";
import {
  map,
  type NodesArrayDataExtractorFn,
  type NodesArrayDataExtractorFnFactory,
  type SingleNodeDataExtractorFn,
} from "../../../../src";

declare function dateExtractor(nodes: Node[], xpathSelect: XPathSelect): Date;
declare class DateExtractorFactory
  implements NodesArrayDataExtractorFnFactory<Date>
{
  createNodesArrayDataExtractor(): NodesArrayDataExtractorFn<Date>;
}

describe("mapping using callback type inference", () => {
  describe("attribute mapping", () => {
    test("regular mapping using callback", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .callback(dateExtractor)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date | undefined>>();
    });

    test("regular mapping using factory", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .callback(new DateExtractorFactory())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date | undefined>>();
    });

    test("mandatory mapping, using callback", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .mandatory()
          .callback(dateExtractor)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("mandatory mapping, using factory", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("regular mapping with default value, using callback", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .callback(dateExtractor)
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("regular mapping with default value, using factory", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .callback(new DateExtractorFactory())
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("mandatory mapping with default value, using callback", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .mandatory()
          .callback(dateExtractor)
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("mandatory mapping with default value, using factory", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("regular mapping with conversion, using callback", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .callback(dateExtractor)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("regular mapping with conversion, using factory", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("mandatory mapping with conversion, using callback", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .mandatory()
          .callback(dateExtractor)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion, using factory", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value, using callback", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .callback(dateExtractor)
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value, using factory", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion and default value, using callback", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .mandatory()
          .callback(dateExtractor)
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion and default value, using factory", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with setting conversion callback after default value, using callback", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .callback(dateExtractor)
          .withDefault(new Date())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("regular mapping with setting conversion callback after default value, using factory", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .callback(new DateExtractorFactory())
          .withDefault(new Date())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });
  });

  describe("element mapping", () => {
    test("regular mapping using callback", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .callback(dateExtractor)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date | undefined>>();
    });

    test("regular mapping using factory", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .callback(new DateExtractorFactory())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date | undefined>>();
    });

    test("mandatory mapping, using callback", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .mandatory()
          .callback(dateExtractor)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("mandatory mapping, using factory", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("regular mapping with default value, using callback", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .callback(dateExtractor)
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("regular mapping with default value, using factory", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .callback(new DateExtractorFactory())
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("mandatory mapping with default value, using callback", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .mandatory()
          .callback(dateExtractor)
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("mandatory mapping with default value, using factory", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("regular mapping with conversion, using callback", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .callback(dateExtractor)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("regular mapping with conversion, using factory", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("mandatory mapping with conversion, using callback", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .mandatory()
          .callback(dateExtractor)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion, using factory", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value, using callback", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .callback(dateExtractor)
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value, using factory", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion and default value, using callback", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .mandatory()
          .callback(dateExtractor)
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion and default value, using factory", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with setting conversion callback after default value, using callback", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .callback(dateExtractor)
          .withDefault(new Date())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("regular mapping with setting conversion callback after default value, using factory", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .callback(new DateExtractorFactory())
          .withDefault(new Date())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });
  });

  describe("node mapping", () => {
    test("regular mapping using callback", () => {
      expectTypeOf(
        map().toNodesArray("").callback(dateExtractor).createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date | undefined>>();
    });

    test("regular mapping using factory", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .callback(new DateExtractorFactory())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date | undefined>>();
    });

    test("mandatory mapping, using callback", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .mandatory()
          .callback(dateExtractor)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("mandatory mapping, using factory", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("regular mapping with default value, using callback", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .callback(dateExtractor)
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("regular mapping with default value, using factory", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .callback(new DateExtractorFactory())
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("mandatory mapping with default value, using callback", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .mandatory()
          .callback(dateExtractor)
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("mandatory mapping with default value, using factory", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("regular mapping with conversion, using callback", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .callback(dateExtractor)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("regular mapping with conversion, using factory", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("mandatory mapping with conversion, using callback", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .mandatory()
          .callback(dateExtractor)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion, using factory", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value, using callback", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .callback(dateExtractor)
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value, using factory", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion and default value, using callback", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .mandatory()
          .callback(dateExtractor)
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion and default value, using factory", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with setting conversion callback after default value, using callback", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .callback(dateExtractor)
          .withDefault(new Date())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("regular mapping with setting conversion callback after default value, using factory", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .callback(new DateExtractorFactory())
          .withDefault(new Date())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });
  });
});
