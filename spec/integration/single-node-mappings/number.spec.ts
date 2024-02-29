import { beforeEach, describe, expect, test } from "vitest";
import xpath from "xpath";
import { map } from "../../../src";
import { parseXml } from "../../helper/parseXml";

describe("number mappings", () => {
  const xml = `
<Root>
    <NumberAttributes
        zero="0"
        negative-zero="-0"
        positive-int="123"
        negative-int="-123"
        positive-float="1.23"
        negative-float="-1.23"
        positive-fract=".75"
        negative-fract="-.75"
        infinity="Infinity"
        positive-infinity="+Infinity"
        negative-infinity="-Infinity"
        not-a-number="not a number"
    />
    <NumberElements>
        <Zero>0</Zero>
        <NegativeZero>-0</NegativeZero>
        <PositiveInt>123</PositiveInt>
        <NegativeInt>-123</NegativeInt>
        <PositiveFloat>1.23</PositiveFloat>
        <NegativeFloat>-1.23</NegativeFloat>
        <PositiveFract>.75</PositiveFract>
        <NegativeFract>-.75</NegativeFract>
        <Infinity>Infinity</Infinity>
        <PositiveInfinity>+Infinity</PositiveInfinity>
        <NegativeInfinity>-Infinity</NegativeInfinity>
        <NotANumber>Not a number</NotANumber>
    </NumberElements>
</Root>
  `;

  let doc: Document;
  const xs = xpath.select;

  beforeEach(() => {
    doc = parseXml(xml);
  });

  describe("getting number value from attribute", () => {
    let execTest: (path: string, expectedResult: number) => void;

    beforeEach(() => {
      execTest = (path, expected) => {
        expect(
          map().toNode(path).asNumber().createNodeDataExtractor()(doc, xs)
        ).toBe(expected);
      };
    });

    test("returning zero", () => {
      execTest("//NumberAttributes/@zero", 0);
    });

    test("returning zero from negative zero", () => {
      execTest("//NumberAttributes/@negative-zero", -0);
    });

    test("returning positive integer", () => {
      execTest("//NumberAttributes/@positive-int", 123);
    });

    test("returning negative integer", () => {
      execTest("//NumberAttributes/@negative-int", -123);
    });

    test("returning positive float", () => {
      execTest("//NumberAttributes/@positive-float", 1.23);
    });

    test("returning negative float", () => {
      execTest("//NumberAttributes/@negative-float", -1.23);
    });

    test("returning positive fract", () => {
      execTest("//NumberAttributes/@positive-fract", 0.75);
    });

    test("returning negative fract", () => {
      execTest("//NumberAttributes/@negative-fract", -0.75);
    });

    test("returning Infinity", () => {
      execTest("//NumberAttributes/@infinity", Infinity);
    });

    test("returning positive Infinity", () => {
      execTest("//NumberAttributes/@positive-infinity", Infinity);
    });

    test("returning negative Infinity", () => {
      execTest("//NumberAttributes/@negative-infinity", -Infinity);
    });

    test("returning NaN", () => {
      expect(
        map()
          .toNode("//NumberAttributes/@not-a-number")
          .asNumber()
          .createNodeDataExtractor()(doc, xs)
      ).toBeNaN();
    });
  });

  describe("getting number value from element", () => {
    let execTest: (path: string, expectedResult: number) => void;

    beforeEach(() => {
      execTest = (path, expected) => {
        expect(
          map().toNode(path).asNumber().createNodeDataExtractor()(doc, xs)
        ).toBe(expected);
      };
    });

    test("returning zero", () => {
      execTest("//NumberElements/Zero", 0);
    });

    test("returning zero from negative zero", () => {
      execTest("//NumberElements/NegativeZero", -0);
    });

    test("returning positive integer", () => {
      execTest("//NumberElements/PositiveInt", 123);
    });

    test("returning negative integer", () => {
      execTest("//NumberElements/NegativeInt", -123);
    });

    test("returning positive float", () => {
      execTest("//NumberElements/PositiveFloat", 1.23);
    });

    test("returning negative float", () => {
      execTest("//NumberElements/NegativeFloat", -1.23);
    });

    test("returning positive fract", () => {
      execTest("//NumberElements/PositiveFract", 0.75);
    });

    test("returning negative fract", () => {
      execTest("//NumberElements/NegativeFract", -0.75);
    });

    test("returning Infinity", () => {
      execTest("//NumberElements/Infinity", Infinity);
    });

    test("returning positive Infinity", () => {
      execTest("//NumberElements/PositiveInfinity", Infinity);
    });

    test("returning negative Infinity", () => {
      execTest("//NumberElements/NegativeInfinity", -Infinity);
    });

    test("returning NaN", () => {
      expect(
        map()
          .toNode("//NumberElements/NotANumber")
          .asNumber()
          .createNodeDataExtractor()(doc, xs)
      ).toBeNaN();
    });
  });

  describe("getting number value from Text node", () => {
    let execTest: (path: string, expectedResult: number) => void;

    beforeEach(() => {
      execTest = (path, expected) => {
        expect(
          map().toNode(path).asNumber().createNodeDataExtractor()(doc, xs)
        ).toBe(expected);
      };
    });

    test("returning zero", () => {
      execTest("//NumberElements/Zero/text()", 0);
    });

    test("returning zero from negative zero", () => {
      execTest("//NumberElements/NegativeZero/text()", -0);
    });

    test("returning positive integer", () => {
      execTest("//NumberElements/PositiveInt/text()", 123);
    });

    test("returning negative integer", () => {
      execTest("//NumberElements/NegativeInt/text()", -123);
    });

    test("returning positive float", () => {
      execTest("//NumberElements/PositiveFloat/text()", 1.23);
    });

    test("returning negative float", () => {
      execTest("//NumberElements/NegativeFloat/text()", -1.23);
    });

    test("returning positive fract", () => {
      execTest("//NumberElements/PositiveFract/text()", 0.75);
    });

    test("returning negative fract", () => {
      execTest("//NumberElements/NegativeFract/text()", -0.75);
    });

    test("returning Infinity", () => {
      execTest("//NumberElements/Infinity/text()", Infinity);
    });

    test("returning positive Infinity", () => {
      execTest("//NumberElements/PositiveInfinity/text()", Infinity);
    });

    test("returning negative Infinity", () => {
      execTest("//NumberElements/NegativeInfinity/text()", -Infinity);
    });

    test("returning NaN", () => {
      expect(
        map()
          .toNode("//NumberElements/NotANumber/text()")
          .asNumber()
          .createNodeDataExtractor()(doc, xs)
      ).toBeNaN();
    });
  });

  describe("returning undefined, when node not found", () => {
    test("returning undefined, when attribute not found", () => {
      expect(
        map()
          .toNode("/Root/@missing-attribute")
          .asNumber()
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("returning undefined, when element not found", () => {
      expect(
        map()
          .toNode("/Root/MissingElement")
          .asNumber()
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("returning undefined, when node not found", () => {
      expect(
        map()
          .toNode("/Root/MissingElement")
          .asNumber()
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });
  });

  describe("throwing Error, when mandatory node not found", () => {
    test("throwing Error, when mandatory attribute not found", () => {
      expect(() =>
        map()
          .toNode("/Root/@missing-attribute")
          .mandatory()
          .asNumber()
          .createNodeDataExtractor()(doc, xs)
      ).toThrow();
    });

    test("throwing Error, when mandatory element not found", () => {
      expect(() =>
        map()
          .toNode("/Root/MissingElement")
          .mandatory()
          .asNumber()
          .createNodeDataExtractor()(doc, xs)
      ).toThrow();
    });

    test("throwing Error, when mandatory node not found", () => {
      expect(() =>
        map()
          .toNode("/Root/MissingElement")
          .mandatory()
          .asNumber()
          .createNodeDataExtractor()(doc, xs)
      ).toThrow();
    });
  });

  describe("returning default value, when node not found", () => {
    test("returning default value, when attribute not found", () => {
      expect(
        map()
          .toNode("/Root/@missing-attribute")
          .asNumber()
          .withDefault(12345)
          .createNodeDataExtractor()(doc, xs)
      ).toBe(12345);
    });

    test("returning default value, when element not found", () => {
      expect(
        map()
          .toNode("/Root/MissingElement")
          .asNumber()
          .withDefault(12345)
          .createNodeDataExtractor()(doc, xs)
      ).toBe(12345);
    });

    test("returning default value, when node not found", () => {
      expect(
        map()
          .toNode("/Root/MissingElement")
          .asNumber()
          .withDefault(12345)
          .createNodeDataExtractor()(doc, xs)
      ).toBe(12345);
    });
  });

  describe("number conversion", () => {
    const conversionFn = (val: number): string => val.toFixed(2);

    test("returning converted value", () => {
      expect(
        map()
          .toNode("//NumberElements/PositiveInt")
          .asNumber()
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBe("123.00");

      expect(
        map()
          .toNode("//NumberElements/NegativeInt")
          .asNumber()
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBe("-123.00");

      expect(
        map()
          .toNode("//NumberElements/Infinity")
          .asNumber()
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBe("Infinity");
    });

    test("returning undefined, when got conversion callback, but reference node not found", () => {
      expect(
        map()
          .toNode("//NumberAttributes/@missing-attribute")
          .asNumber()
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("reset default value, when conversion callback was set after default value", () => {
      expect(
        map()
          .toNode("//NumberAttributes/@missing-attribute")
          .asNumber()
          .withDefault(0)
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("return default value of converted type, when conversion callback was set and reference node not found", () => {
      expect(
        map()
          .toNode("//NumberAttributes/@missing-attribute")
          .asNumber()
          .withConversion(conversionFn)
          .withDefault("N/A")
          .createNodeDataExtractor()(doc, xs)
      ).toBe("N/A");
    });
  });
});
