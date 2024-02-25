import { beforeEach, describe, expect, test } from "vitest";
import xpath from "xpath";
import { map } from "../../../src";
import { parseXml } from "../../helper/parseXml";

describe("boolean mappings", () => {
  const xml = `
<Root>
    <BooleanAttributes
        true-string="true"
        true-custom-text="not empty value"
        true-one="1"
        true-positive-number="123.5"
        true-negative-number="-123.5"
        false-string="false"
        false-empty-value=""
        false-zero="0"
        false-negative-zero="-0"
        false-null="null"
    />
    <BooleanElements>
        <TrueString>True</TrueString>
        <TrueCustomText>Not empty element</TrueCustomText>
        <TrueOne>1</TrueOne>
        <TruePositiveNumber>12.345</TruePositiveNumber>
        <TrueNegativeNumber>-12.345</TrueNegativeNumber>
        <TrueNested><NestedElement>SomeValue</NestedElement></TrueNested>
        <FalseString>False</FalseString>
        <FalseNoContent></FalseNoContent>
        <FalseSelfClosing/>
        <FalseZero>0</FalseZero>
        <FalseNegativeZero>-0</FalseNegativeZero>
        <FalseNull>Null</FalseNull>
    </BooleanElements>
</Root>
  `;

  let doc: Document;
  const xs = xpath.select;

  beforeEach(() => {
    doc = parseXml(xml);
  });

  describe("getting boolean value from attribute", () => {
    let testAttribute: (path: string) => boolean | undefined;

    beforeEach(() => {
      testAttribute = (path) =>
        map().toAttribute(path).asBoolean().createNodeDataExtractor()(doc, xs);
    });

    test("get boolean true from attribute with value 'true'", () => {
      expect(testAttribute("//BooleanAttributes/@true-string")).toBe(true);
    });

    test("get boolean true from attribute with not empty string", () => {
      expect(testAttribute("//BooleanAttributes/@true-custom-text")).toBe(true);
    });

    test("get boolean true from attribute with value '1'", () => {
      expect(testAttribute("//BooleanAttributes/@true-one")).toBe(true);
    });

    test("get boolean true from attribute with value of positive number", () => {
      expect(testAttribute("//BooleanAttributes/@true-positive-number")).toBe(
        true
      );
    });

    test("get boolean true from attribute with value of negative number", () => {
      expect(testAttribute("//BooleanAttributes/@true-negative-number")).toBe(
        true
      );
    });

    test("get boolean false from attribute with value 'false'", () => {
      expect(testAttribute("//BooleanAttributes/@false-string")).toBe(false);
    });

    test("get boolean false from attribute with empty value", () => {
      expect(testAttribute("//BooleanAttributes/@false-empty-value")).toBe(
        false
      );
    });

    test("get boolean false from attribute with value '0'", () => {
      expect(testAttribute("//BooleanAttributes/@false-zero")).toBe(false);
    });

    test("get boolean false from attribute with value '-0'", () => {
      expect(testAttribute("//BooleanAttributes/@false-negative-zero")).toBe(
        false
      );
    });

    test("get boolean false from attribute with value 'null'", () => {
      expect(testAttribute("//BooleanAttributes/@false-null")).toBe(false);
    });
  });

  describe("getting boolean value from element", () => {
    let testElement: (path: string) => boolean | undefined;

    beforeEach(() => {
      testElement = (path) =>
        map().toElement(path).asBoolean().createNodeDataExtractor()(doc, xs);
    });

    test("get boolean true from element with content 'True'", () => {
      expect(testElement("//BooleanElements/TrueString")).toBe(true);
    });

    test("get boolean true from element with not empty content", () => {
      expect(testElement("//BooleanElements/TrueCustomText")).toBe(true);
    });

    test("get boolean true from element with content '1'", () => {
      expect(testElement("//BooleanElements/TrueOne")).toBe(true);
    });

    test("get boolean true from element with positive number content", () => {
      expect(testElement("//BooleanElements/TruePositiveNumber")).toBe(true);
    });

    test("get boolean true from element with negative number content", () => {
      expect(testElement("//BooleanElements/TrueNegativeNumber")).toBe(true);
    });

    test("get boolean true from element with not empty nested element", () => {
      expect(testElement("//BooleanElements/TrueNested")).toBe(true);
    });

    test("get boolean false from element with content 'False'", () => {
      expect(testElement("//BooleanElements/FalseString")).toBe(false);
    });

    test("get boolean false from empty element", () => {
      expect(testElement("//BooleanElements/FalseNoContent")).toBe(false);
    });

    test("get boolean false from self-closing element", () => {
      expect(testElement("//BooleanElements/FalseSelfClosing")).toBe(false);
    });

    test("get boolean false from element with content '0'", () => {
      expect(testElement("//BooleanElements/FalseZero")).toBe(false);
    });

    test("get boolean false from element with content '-0'", () => {
      expect(testElement("//BooleanElements/FalseNegativeZero")).toBe(false);
    });

    test("get boolean false from element with content 'Null'", () => {
      expect(testElement("//BooleanElements/FalseNull")).toBe(false);
    });
  });

  describe("getting boolean value from Text node", () => {
    let testNode: (path: string) => boolean | undefined;

    beforeEach(() => {
      testNode = (path) =>
        map().toNode(path).asBoolean().createNodeDataExtractor()(doc, xs);
    });

    test("get boolean true from Text node with content 'True'", () => {
      expect(testNode("//BooleanElements/TrueString/text()")).toBe(true);
    });

    test("get boolean true from Text node with not empty content", () => {
      expect(testNode("//BooleanElements/TrueCustomText/text()")).toBe(true);
    });

    test("get boolean true from Text node with content '1'", () => {
      expect(testNode("//BooleanElements/TrueOne/text()")).toBe(true);
    });

    test("get boolean true from Text node with positive number content", () => {
      expect(testNode("//BooleanElements/TruePositiveNumber/text()")).toBe(
        true
      );
    });

    test("get boolean true from Text node with negative number content", () => {
      expect(testNode("//BooleanElements/TrueNegativeNumber/text()")).toBe(
        true
      );
    });

    test("get boolean false from Text node with content 'False'", () => {
      expect(testNode("//BooleanElements/FalseString/text()")).toBe(false);
    });

    test("get boolean false from Text node with content '0'", () => {
      expect(testNode("//BooleanElements/FalseZero/text()")).toBe(false);
    });

    test("get boolean false from Text node with content '-0'", () => {
      expect(testNode("//BooleanElements/FalseNegativeZero/text()")).toBe(
        false
      );
    });

    test("get boolean false from Text node with content 'Null'", () => {
      expect(testNode("//BooleanElements/FalseNull/text()")).toBe(false);
    });
  });

  describe("getting undefined, when reference node not found", () => {
    test("get undefined, when attribute not found", () => {
      expect(
        map()
          .toAttribute("//BooleanAttributes/@missing-attribute")
          .asBoolean()
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("get undefined, when element not found", () => {
      expect(
        map()
          .toElement("//BooleanElements/MissingElement")
          .asBoolean()
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("get undefined, when node not found", () => {
      expect(
        map()
          .toNode("//BooleanElements/MissingElement/text()")
          .asBoolean()
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });
  });

  describe("throwing Error, when mandatory reference node not found", () => {
    test("throwing Error, when mandatory attribute not found", () => {
      expect(() =>
        map()
          .toAttribute("//BooleanAttributes/@missing-attribute")
          .mandatory()
          .asBoolean()
          .createNodeDataExtractor()(doc, xs)
      ).toThrow(Error);
    });

    test("throwing Error, when mandatory element not found", () => {
      expect(() =>
        map()
          .toElement("//BooleanElements/MissingElement")
          .mandatory()
          .asBoolean()
          .createNodeDataExtractor()(doc, xs)
      ).toThrow(Error);
    });

    test("throwing Error, when mandatory node not found", () => {
      expect(() =>
        map()
          .toNode("//BooleanElements/MissingElement/text()")
          .mandatory()
          .asBoolean()
          .createNodeDataExtractor()(doc, xs)
      ).toThrow(Error);
    });
  });

  describe("returning default value, when reference node not found", () => {
    test("returning default value, when attribute not found", () => {
      const binding = map()
        .toAttribute("//BooleanAttributes/@missing-attribute")
        .asBoolean();
      expect(binding.withDefault(true).createNodeDataExtractor()(doc, xs)).toBe(
        true
      );
      expect(
        binding.withDefault(false).createNodeDataExtractor()(doc, xs)
      ).toBe(false);
    });

    test("returning default value, when element not found", () => {
      const binding = map()
        .toElement("//BooleanElements/MissingElement")
        .asBoolean();
      expect(binding.withDefault(true).createNodeDataExtractor()(doc, xs)).toBe(
        true
      );
      expect(
        binding.withDefault(false).createNodeDataExtractor()(doc, xs)
      ).toBe(false);
    });

    test("returning default value, when node not found", () => {
      const binding = map()
        .toNode("//BooleanElements/MissingElement/text()")
        .asBoolean();
      expect(binding.withDefault(true).createNodeDataExtractor()(doc, xs)).toBe(
        true
      );
      expect(
        binding.withDefault(false).createNodeDataExtractor()(doc, xs)
      ).toBe(false);
    });
  });

  describe("boolean conversion", () => {
    type YesNo = "Yes" | "No";
    const conversionFn = (val: boolean): YesNo => (val ? "Yes" : "No");

    test("returning converted value", () => {
      expect(
        map()
          .toAttribute("//BooleanAttributes/@true-string")
          .asBoolean()
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBe("Yes");

      expect(
        map()
          .toAttribute("//BooleanAttributes/@false-string")
          .asBoolean()
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBe("No");
    });

    test("returning undefined, when got conversion callback, but reference node not found", () => {
      expect(
        map()
          .toAttribute("//BooleanAttributes/@missing-attribute")
          .asBoolean()
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("reset default value, when conversion callback was set after default value", () => {
      expect(
        map()
          .toAttribute("//BooleanAttributes/@missing-attribute")
          .asBoolean()
          .withDefault(true)
          .withConversion(conversionFn)
          .createNodeDataExtractor()(doc, xs)
      ).toBeUndefined();
    });

    test("return default value of converted type, when conversion callback was set and reference node not found", () => {
      expect(
        map()
          .toAttribute("//BooleanAttributes/@missing-attribute")
          .asBoolean()
          .withConversion(conversionFn)
          .withDefault("Yes")
          .createNodeDataExtractor()(doc, xs)
      ).toBe("Yes");
    });
  });
});
