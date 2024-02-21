import { beforeEach, describe, expect, it } from "vitest";
import xpath from "xpath";
import {
  AnyNodeLookupFactory,
  BaseSingleNodeBindingBuilder,
  BaseSingleNodeLookupBuilder,
  RecursiveObjectExtractorFactory,
  type SingleNodeLookupFactory,
  StringExtractorFactory,
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
  let factory: AnyNodeLookupFactory;
  const path = "//ElementThatDoesntExist";
  let builder: BaseSingleNodeLookupBuilder<Node | undefined>;

  beforeEach(() => {
    doc = parseXml(xml);
    factory = new AnyNodeLookupFactory();
    builder = new BaseSingleNodeLookupBuilder<Node | undefined>(factory, path);
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

    it("should return builder of SingleNodeLookupFn, that throws RangeError, when node not found", () => {
      const lookupFn = mandatoryBuilder.buildNodeLookup();
      expect(() => lookupFn(doc, xs)).toThrow(RangeError);
    });
  });

  describe("optional() method", () => {
    let mandatoryBuilder: BaseSingleNodeLookupBuilder<Node>;
    let optionalBuilder: BaseSingleNodeLookupBuilder<Node | undefined>;

    beforeEach(() => {
      mandatoryBuilder = new BaseSingleNodeLookupBuilder<Node>(
        factory as SingleNodeLookupFactory<Node>,
        path,
        true
      );
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
      expect(builder.asString()).toBeInstanceOf(BaseSingleNodeBindingBuilder);
    });
  });

  describe("asNumber() method", () => {
    it("should return instance of BaseSingleNodeBindingBuilder", () => {
      expect(builder.asNumber()).toBeInstanceOf(BaseSingleNodeBindingBuilder);
    });
  });

  describe("asBoolean() method", () => {
    it("should return instance of BaseSingleNodeBindingBuilder", () => {
      expect(builder.asBoolean()).toBeInstanceOf(BaseSingleNodeBindingBuilder);
    });
  });

  describe("asObject() method", () => {
    it("should accept ObjectBlueprint and return instance of BaseSingleNodeBindingBuilder", () => {
      expect(
        builder.asObject({
          numberValue: () => 1,
        })
      ).toBeInstanceOf(BaseSingleNodeBindingBuilder);
    });
  });

  describe("asRecursiveObject() method", () => {
    it("should accept RecursiveObjectFactory callback and return instance of BaseSingleNodeBindingBuilder", () => {
      expect(
        builder.asRecursiveObject(() => ({
          title: () => "title",
        }))
      ).toBeInstanceOf(BaseSingleNodeBindingBuilder);
    });

    it("should accept instance of RecursiveObjectExtractorFactory and return instance of BaseSingleNodeBindingBuilder", () => {
      const recursiveObjectExtractorFactory =
        new RecursiveObjectExtractorFactory(() => ({ title: () => "title" }));
      expect(
        builder.asRecursiveObject(recursiveObjectExtractorFactory)
      ).toBeInstanceOf(BaseSingleNodeBindingBuilder);
    });
  });

  describe("callback() method", () => {
    it("should accept SingleNodeDataExtractorFn callback and return instance of BaseSingleNodeBindingBuilder", () => {
      expect(
        builder.callback((node, xs) => xs("string(.)", node, true) as string)
      ).toBeInstanceOf(BaseSingleNodeBindingBuilder);
    });

    it("should accept SingleNodeDataExtractorFnFactory instance and return instance of BaseSingleNodeBindingBuilder", () => {
      expect(builder.callback(new StringExtractorFactory())).toBeInstanceOf(
        BaseSingleNodeBindingBuilder
      );
    });
  });
});
