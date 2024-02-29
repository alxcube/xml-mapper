import { beforeEach, describe, expect, test } from "vitest";
import xpath from "xpath";
import { map } from "../../../src";
import { parseXml } from "../../helper/parseXml";

describe("string mappings", () => {
  const xml = `
<Root>
    <StringAttributes attr="attribute value" empty=""/>
    <StringElements>
        <String>String value</String>
        <EmptyString></EmptyString>
        <SelfClosingEmptyString/>
        <Nested><String>Nested</String><String>string</String></Nested>
        <StringInCdata><![CDATA[String inside CDATA]]></StringInCdata>
        <!-- String in comment -->
    </StringElements>
    <StringWithExponentialNumber exp="1e-2">1e-1</StringWithExponentialNumber>
</Root>
  `;

  let doc: Document;
  const xs = xpath.select;

  beforeEach(() => {
    doc = parseXml(xml);
  });

  describe("getting string values from attributes", () => {
    let execTest: (path: string, expected: string) => void;

    beforeEach(() => {
      execTest = (path, expected) => {
        expect(
          map().toNode(path).asString().createNodeDataExtractor()(doc, xs)
        ).toBe(expected);
      };
    });

    test("returning string value from attribute", () => {
      execTest("//StringAttributes/@attr", "attribute value");
    });

    test("returning empty string from attribute with empty value", () => {
      execTest("//StringAttributes/@empty", "");
    });
  });

  describe("getting string values from elements", () => {
    let execTest: (path: string, expected: string) => void;

    beforeEach(() => {
      execTest = (path, expected) => {
        expect(
          map().toNode(path).asString().createNodeDataExtractor()(doc, xs)
        ).toBe(expected);
      };
    });

    test("returning string value from element", () => {
      execTest("//StringElements/String", "String value");
    });

    test("returning empty string from element with no content", () => {
      execTest("//StringElements/EmptyString", "");
    });

    test("returning empty string from self-closing element", () => {
      execTest("//StringElements/SelfClosingEmptyString", "");
    });

    test("returning string value from element with nested elements", () => {
      execTest("//StringElements/Nested", "Nestedstring");
    });

    test("returning string value from element with CDATA section", () => {
      execTest("//StringElements/StringInCdata", "String inside CDATA");
    });
  });

  describe("getting string values from different nodes", () => {
    let execTest: (path: string, expected: string) => void;

    beforeEach(() => {
      execTest = (path, expected) => {
        expect(
          map().toNode(path).asString().createNodeDataExtractor()(doc, xs)
        ).toBe(expected);
      };
    });

    test("returning string value from attribute", () => {
      execTest("//StringAttributes/@attr", "attribute value");
    });

    test("returning string value from element", () => {
      execTest("//StringElements/String", "String value");
    });

    test("returning string value from Text node", () => {
      execTest("//StringElements/String/text()[1]", "String value");
    });

    test("returning string value from comment", () => {
      execTest("//StringElements/comment()[1]", " String in comment ");
    });
  });

  describe("returning undefined, when node not found", () => {
    test("returning undefined, when attribute not found", () => {
      expect(
        map()
          .toNode("/Root/@missing-attribute")
          .asString()
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("returning undefined, when element not found", () => {
      expect(
        map()
          .toNode("/Root/MissingElement")
          .asString()
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("returning undefined, when node not found", () => {
      expect(
        map()
          .toNode("/Root/MissingElement")
          .asString()
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
          .asString()
          .createNodeDataExtractor()(doc, xs)
      ).toThrow();
    });

    test("throwing Error, when mandatory element not found", () => {
      expect(() =>
        map()
          .toNode("/Root/MissingElement")
          .mandatory()
          .asString()
          .createNodeDataExtractor()(doc, xs)
      ).toThrow();
    });

    test("throwing Error, when mandatory node not found", () => {
      expect(() =>
        map()
          .toNode("/Root/MissingElement")
          .mandatory()
          .asString()
          .createNodeDataExtractor()(doc, xs)
      ).toThrow();
    });
  });

  describe("returning default value, when node not found", () => {
    test("returning default value, when attribute not found", () => {
      expect(
        map()
          .toNode("/Root/@missing-attribute")
          .asString()
          .withDefault("fallback")
          .createNodeDataExtractor()(doc, xs)
      ).toBe("fallback");
    });

    test("returning default value, when element not found", () => {
      expect(
        map()
          .toNode("/Root/MissingElement")
          .asString()
          .withDefault("fallback")
          .createNodeDataExtractor()(doc, xs)
      ).toBe("fallback");
    });

    test("returning default value, when node not found", () => {
      expect(
        map()
          .toNode("/Root/MissingElement")
          .asString()
          .withDefault("fallback")
          .createNodeDataExtractor()(doc, xs)
      ).toBe("fallback");
    });
  });

  describe("string conversion", () => {
    const conversionFn = (val: string): number => parseFloat(val);

    test("returning converted value", () => {
      expect(
        map()
          .toNode("//StringWithExponentialNumber")
          .asString()
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBe(0.1);

      expect(
        map()
          .toNode("//StringWithExponentialNumber/@exp")
          .asString()
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBe(0.01);
    });

    test("returning undefined, when got conversion callback, but reference node not found", () => {
      expect(
        map()
          .toNode("//StringElements/@missing-attribute")
          .asString()
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("reset default value, when conversion callback was set after default value", () => {
      expect(
        map()
          .toNode("//StringElements/@missing-attribute")
          .asString()
          .withDefault("fallback")
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("return default value of converted type, when conversion callback was set and reference node not found", () => {
      expect(
        map()
          .toNode("//StringElements/@missing-attribute")
          .asString()
          .withConversion(conversionFn)
          .withDefault(10)
          .createNodeDataExtractor()(doc, xs)
      ).toBe(10);
    });
  });
});
