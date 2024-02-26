import { describe, expectTypeOf, test } from "vitest";
import type { XPathSelect } from "xpath";
import {
  map,
  type SingleNodeDataExtractorFn,
  type SingleNodeDataExtractorFnFactory,
} from "../../../../src";

declare function dateExtractor(node: Node, xpathSelect: XPathSelect): Date;
declare class DateExtractorFactory
  implements SingleNodeDataExtractorFnFactory<Date>
{
  createNodeDataExtractor(): SingleNodeDataExtractorFn<Date>;
}

describe("mapping using callback type inference", () => {
  describe("attribute mapping", () => {
    test("regular mapping using callback", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .asArray()
          .usingMapper(dateExtractor)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[] | undefined>>();
    });

    test("regular mapping using factory", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[] | undefined>>();
    });

    test("mandatory mapping, using callback", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .mandatory()
          .asArray()
          .usingMapper(dateExtractor)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[]>>();
    });

    test("mandatory mapping, using factory", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .mandatory()
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[]>>();
    });

    test("regular mapping with default value, using callback", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .asArray()
          .usingMapper(dateExtractor)
          .withDefault([new Date()])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[]>>();
    });

    test("regular mapping with default value, using factory", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .withDefault([new Date()])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[]>>();
    });

    test("mandatory mapping with default value, using callback", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .mandatory()
          .asArray()
          .usingMapper(dateExtractor)
          .withDefault([new Date()])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[]>>();
    });

    test("mandatory mapping with default value, using factory", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .mandatory()
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .withDefault([new Date()])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[]>>();
    });

    test("regular mapping with conversion, using callback", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .asArray()
          .usingMapper(dateExtractor)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("regular mapping with conversion, using factory", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("mandatory mapping with conversion, using callback", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .mandatory()
          .asArray()
          .usingMapper(dateExtractor)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion, using factory", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .mandatory()
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value, using callback", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .asArray()
          .usingMapper(dateExtractor)
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value, using factory", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .asArray()
          .usingMapper(new DateExtractorFactory())
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
          .asArray()
          .usingMapper(dateExtractor)
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
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with setting conversion callback after default value, using callback", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .asArray()
          .usingMapper(dateExtractor)
          .withDefault([new Date()])
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("regular mapping with setting conversion callback after default value, using factory", () => {
      expectTypeOf(
        map()
          .toAttributesArray("")
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .withDefault([new Date()])
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
          .asArray()
          .usingMapper(dateExtractor)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[] | undefined>>();
    });

    test("regular mapping using factory", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[] | undefined>>();
    });

    test("mandatory mapping, using callback", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .mandatory()
          .asArray()
          .usingMapper(dateExtractor)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[]>>();
    });

    test("mandatory mapping, using factory", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .mandatory()
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[]>>();
    });

    test("regular mapping with default value, using callback", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .asArray()
          .usingMapper(dateExtractor)
          .withDefault([new Date()])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[]>>();
    });

    test("regular mapping with default value, using factory", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .withDefault([new Date()])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[]>>();
    });

    test("mandatory mapping with default value, using callback", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .mandatory()
          .asArray()
          .usingMapper(dateExtractor)
          .withDefault([new Date()])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[]>>();
    });

    test("mandatory mapping with default value, using factory", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .mandatory()
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .withDefault([new Date()])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[]>>();
    });

    test("regular mapping with conversion, using callback", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .asArray()
          .usingMapper(dateExtractor)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("regular mapping with conversion, using factory", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("mandatory mapping with conversion, using callback", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .mandatory()
          .asArray()
          .usingMapper(dateExtractor)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion, using factory", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .mandatory()
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value, using callback", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .asArray()
          .usingMapper(dateExtractor)
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value, using factory", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .asArray()
          .usingMapper(new DateExtractorFactory())
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
          .asArray()
          .usingMapper(dateExtractor)
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
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with setting conversion callback after default value, using callback", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .asArray()
          .usingMapper(dateExtractor)
          .withDefault([new Date()])
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("regular mapping with setting conversion callback after default value, using factory", () => {
      expectTypeOf(
        map()
          .toElementsArray("")
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .withDefault([new Date()])
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });
  });

  describe("node mapping", () => {
    test("regular mapping using callback", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .asArray()
          .usingMapper(dateExtractor)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[] | undefined>>();
    });

    test("regular mapping using factory", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[] | undefined>>();
    });

    test("mandatory mapping, using callback", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .mandatory()
          .asArray()
          .usingMapper(dateExtractor)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[]>>();
    });

    test("mandatory mapping, using factory", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .mandatory()
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[]>>();
    });

    test("regular mapping with default value, using callback", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .asArray()
          .usingMapper(dateExtractor)
          .withDefault([new Date()])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[]>>();
    });

    test("regular mapping with default value, using factory", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .withDefault([new Date()])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[]>>();
    });

    test("mandatory mapping with default value, using callback", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .mandatory()
          .asArray()
          .usingMapper(dateExtractor)
          .withDefault([new Date()])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[]>>();
    });

    test("mandatory mapping with default value, using factory", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .mandatory()
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .withDefault([new Date()])
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date[]>>();
    });

    test("regular mapping with conversion, using callback", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .asArray()
          .usingMapper(dateExtractor)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("regular mapping with conversion, using factory", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("mandatory mapping with conversion, using callback", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .mandatory()
          .asArray()
          .usingMapper(dateExtractor)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion, using factory", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .mandatory()
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value, using callback", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .asArray()
          .usingMapper(dateExtractor)
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value, using factory", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .asArray()
          .usingMapper(new DateExtractorFactory())
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
          .asArray()
          .usingMapper(dateExtractor)
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
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with setting conversion callback after default value, using callback", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .asArray()
          .usingMapper(dateExtractor)
          .withDefault([new Date()])
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("regular mapping with setting conversion callback after default value, using factory", () => {
      expectTypeOf(
        map()
          .toNodesArray("")
          .asArray()
          .usingMapper(new DateExtractorFactory())
          .withDefault([new Date()])
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });
  });
});
