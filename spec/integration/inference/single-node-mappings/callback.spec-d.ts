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
        map().toAttribute("").callback(dateExtractor).createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date | undefined>>();
    });

    test("regular mapping using factory", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .callback(new DateExtractorFactory())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date | undefined>>();
    });

    test("mandatory mapping, using callback", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .mandatory()
          .callback(dateExtractor)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("mandatory mapping, using factory", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("regular mapping with default value, using callback", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .callback(dateExtractor)
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("regular mapping with default value, using factory", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .callback(new DateExtractorFactory())
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("mandatory mapping with default value, using callback", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .mandatory()
          .callback(dateExtractor)
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("mandatory mapping with default value, using factory", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("regular mapping with conversion, using callback", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .callback(dateExtractor)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("regular mapping with conversion, using factory", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("mandatory mapping with conversion, using callback", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .mandatory()
          .callback(dateExtractor)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion, using factory", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value, using callback", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .callback(dateExtractor)
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value, using factory", () => {
      expectTypeOf(
        map()
          .toAttribute("")
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion and default value, using callback", () => {
      expectTypeOf(
        map()
          .toAttribute("")
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
          .toAttribute("")
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
          .toAttribute("")
          .callback(dateExtractor)
          .withDefault(new Date())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("regular mapping with setting conversion callback after default value, using factory", () => {
      expectTypeOf(
        map()
          .toAttribute("")
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
        map().toElement("").callback(dateExtractor).createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date | undefined>>();
    });

    test("regular mapping using factory", () => {
      expectTypeOf(
        map()
          .toElement("")
          .callback(new DateExtractorFactory())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date | undefined>>();
    });

    test("mandatory mapping, using callback", () => {
      expectTypeOf(
        map()
          .toElement("")
          .mandatory()
          .callback(dateExtractor)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("mandatory mapping, using factory", () => {
      expectTypeOf(
        map()
          .toElement("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("regular mapping with default value, using callback", () => {
      expectTypeOf(
        map()
          .toElement("")
          .callback(dateExtractor)
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("regular mapping with default value, using factory", () => {
      expectTypeOf(
        map()
          .toElement("")
          .callback(new DateExtractorFactory())
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("mandatory mapping with default value, using callback", () => {
      expectTypeOf(
        map()
          .toElement("")
          .mandatory()
          .callback(dateExtractor)
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("mandatory mapping with default value, using factory", () => {
      expectTypeOf(
        map()
          .toElement("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("regular mapping with conversion, using callback", () => {
      expectTypeOf(
        map()
          .toElement("")
          .callback(dateExtractor)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("regular mapping with conversion, using factory", () => {
      expectTypeOf(
        map()
          .toElement("")
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("mandatory mapping with conversion, using callback", () => {
      expectTypeOf(
        map()
          .toElement("")
          .mandatory()
          .callback(dateExtractor)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion, using factory", () => {
      expectTypeOf(
        map()
          .toElement("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value, using callback", () => {
      expectTypeOf(
        map()
          .toElement("")
          .callback(dateExtractor)
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value, using factory", () => {
      expectTypeOf(
        map()
          .toElement("")
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion and default value, using callback", () => {
      expectTypeOf(
        map()
          .toElement("")
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
          .toElement("")
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
          .toElement("")
          .callback(dateExtractor)
          .withDefault(new Date())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("regular mapping with setting conversion callback after default value, using factory", () => {
      expectTypeOf(
        map()
          .toElement("")
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
        map().toNode("").callback(dateExtractor).createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date | undefined>>();
    });

    test("regular mapping using factory", () => {
      expectTypeOf(
        map()
          .toNode("")
          .callback(new DateExtractorFactory())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date | undefined>>();
    });

    test("mandatory mapping, using callback", () => {
      expectTypeOf(
        map()
          .toNode("")
          .mandatory()
          .callback(dateExtractor)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("mandatory mapping, using factory", () => {
      expectTypeOf(
        map()
          .toNode("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("regular mapping with default value, using callback", () => {
      expectTypeOf(
        map()
          .toNode("")
          .callback(dateExtractor)
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("regular mapping with default value, using factory", () => {
      expectTypeOf(
        map()
          .toNode("")
          .callback(new DateExtractorFactory())
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("mandatory mapping with default value, using callback", () => {
      expectTypeOf(
        map()
          .toNode("")
          .mandatory()
          .callback(dateExtractor)
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("mandatory mapping with default value, using factory", () => {
      expectTypeOf(
        map()
          .toNode("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .withDefault(new Date())
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<Date>>();
    });

    test("regular mapping with conversion, using callback", () => {
      expectTypeOf(
        map()
          .toNode("")
          .callback(dateExtractor)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("regular mapping with conversion, using factory", () => {
      expectTypeOf(
        map()
          .toNode("")
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("mandatory mapping with conversion, using callback", () => {
      expectTypeOf(
        map()
          .toNode("")
          .mandatory()
          .callback(dateExtractor)
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion, using factory", () => {
      expectTypeOf(
        map()
          .toNode("")
          .mandatory()
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value, using callback", () => {
      expectTypeOf(
        map()
          .toNode("")
          .callback(dateExtractor)
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("regular mapping with conversion and default value, using factory", () => {
      expectTypeOf(
        map()
          .toNode("")
          .callback(new DateExtractorFactory())
          .withConversion(String)
          .withDefault("")
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string>>();
    });

    test("mandatory mapping with conversion and default value, using callback", () => {
      expectTypeOf(
        map()
          .toNode("")
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
          .toNode("")
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
          .toNode("")
          .callback(dateExtractor)
          .withDefault(new Date())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });

    test("regular mapping with setting conversion callback after default value, using factory", () => {
      expectTypeOf(
        map()
          .toNode("")
          .callback(new DateExtractorFactory())
          .withDefault(new Date())
          .withConversion(String)
          .createNodeDataExtractor()
      ).toEqualTypeOf<SingleNodeDataExtractorFn<string | undefined>>();
    });
  });
});
