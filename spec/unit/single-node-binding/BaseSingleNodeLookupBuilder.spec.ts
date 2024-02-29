import { beforeEach, describe, expect, it } from "vitest";
import xpath from "xpath";
import {
  BaseSingleNodeLookupBuilder,
  RecursiveObjectExtractorFactory,
  StringExtractorFactory,
  BaseLookupToDataExtractorBindingBuilder,
  LookupError,
} from "../../../src";
import { parseXml } from "../../helper/parseXml";

describe("BaseSingleNodeLookupBuilder class", () => {
  const xml = `
<Root>
    <Element attribute="test">
        Text node
        <!-- Comment node -->
    </Element>
</Root>
  `;
  let doc: Document;
  const xs = xpath.select;
  const path = "//ElementThatDoesntExist";
  let builder: BaseSingleNodeLookupBuilder<Node | undefined>;

  beforeEach(() => {
    doc = parseXml(xml);
    builder = new BaseSingleNodeLookupBuilder<Node | undefined>(path);
  });

  describe("mandatory() method", () => {
    let mandatoryBuilder: BaseSingleNodeLookupBuilder<Node>;

    beforeEach(() => {
      mandatoryBuilder =
        builder.mandatory() as BaseSingleNodeLookupBuilder<Node>;
    });

    it("should return new BaseSingleNodeLookupBuilder instance", () => {
      expect(mandatoryBuilder).toBeInstanceOf(BaseSingleNodeLookupBuilder);
      expect(mandatoryBuilder).not.toBe(builder);
    });

    it("should return builder of SingleNodeLookupFn, that throws LookupError, when node not found", () => {
      const lookupFn = mandatoryBuilder.buildNodeLookup();
      expect(() => lookupFn(doc, xs)).toThrow(LookupError);
    });
  });

  describe("optional() method", () => {
    let mandatoryBuilder: BaseSingleNodeLookupBuilder<Node>;
    let optionalBuilder: BaseSingleNodeLookupBuilder<Node | undefined>;

    beforeEach(() => {
      mandatoryBuilder = new BaseSingleNodeLookupBuilder<Node>(path, true);
      optionalBuilder =
        mandatoryBuilder.optional() as BaseSingleNodeLookupBuilder<
          Node | undefined
        >;
    });

    it("should return new BaseSingleNodeLookupBuilder instance", () => {
      expect(optionalBuilder).toBeInstanceOf(BaseSingleNodeLookupBuilder);
      expect(optionalBuilder).not.toBe(builder);
    });

    it("should return builder of SingleNodeLookupFn, that returns undefined, when node not found", () => {
      const lookupFn = optionalBuilder.buildNodeLookup();
      expect(lookupFn(doc, xs)).toBeUndefined();
    });
  });

  describe("asString() method", () => {
    it("should return instance of BaseSingleNodeBindingBuilder", () => {
      expect(builder.asString()).toBeInstanceOf(
        BaseLookupToDataExtractorBindingBuilder
      );
    });
  });

  describe("asNumber() method", () => {
    it("should return instance of BaseSingleNodeBindingBuilder", () => {
      expect(builder.asNumber()).toBeInstanceOf(
        BaseLookupToDataExtractorBindingBuilder
      );
    });
  });

  describe("asBoolean() method", () => {
    it("should return instance of BaseSingleNodeBindingBuilder", () => {
      expect(builder.asBoolean()).toBeInstanceOf(
        BaseLookupToDataExtractorBindingBuilder
      );
    });
  });

  describe("asObject() method", () => {
    it("should accept ObjectBlueprint and return instance of BaseSingleNodeBindingBuilder", () => {
      expect(
        builder.asObject({
          numberValue: () => 1,
        })
      ).toBeInstanceOf(BaseLookupToDataExtractorBindingBuilder);
    });
  });

  describe("asRecursiveObject() method", () => {
    it("should accept RecursiveObjectFactory callback and return instance of BaseSingleNodeBindingBuilder", () => {
      expect(
        builder.asRecursiveObject(() => ({
          title: () => "title",
        }))
      ).toBeInstanceOf(BaseLookupToDataExtractorBindingBuilder);
    });

    it("should accept instance of RecursiveObjectExtractorFactory and return instance of BaseSingleNodeBindingBuilder", () => {
      const recursiveObjectExtractorFactory =
        new RecursiveObjectExtractorFactory(() => ({ title: () => "title" }));
      expect(
        builder.asRecursiveObject(recursiveObjectExtractorFactory)
      ).toBeInstanceOf(BaseLookupToDataExtractorBindingBuilder);
    });
  });

  describe("callback() method", () => {
    it("should accept SingleNodeDataExtractorFn callback and return instance of BaseSingleNodeBindingBuilder", () => {
      expect(
        builder.callback((node, xs) => xs("string(.)", node, true) as string)
      ).toBeInstanceOf(BaseLookupToDataExtractorBindingBuilder);
    });

    it("should accept SingleNodeDataExtractorFnFactory instance and return instance of BaseSingleNodeBindingBuilder", () => {
      expect(builder.callback(new StringExtractorFactory())).toBeInstanceOf(
        BaseLookupToDataExtractorBindingBuilder
      );
    });
  });

  describe("getPath() method", () => {
    it("should return xpath expression, used for node lookup", () => {
      expect(builder.getPath()).toBe(path);
    });
  });
});
