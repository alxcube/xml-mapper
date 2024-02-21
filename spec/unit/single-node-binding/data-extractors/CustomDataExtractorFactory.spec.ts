import { describe, expect, it, vi } from "vitest";
import xpath from "xpath";
import {
  CustomDataExtractorFactory,
  type SingleNodeDataExtractorFn,
  type SingleNodeDataExtractorFnFactory,
} from "../../../../src";
import { parseXml } from "../../../helper/parseXml";

describe("CustomDataExtractorFactory class", () => {
  it("should accept SingleNodeDataExtractorFn in constructor and create SingleNodeDataExtractorFn, that calls passed function and returns call result", () => {
    const spy = vi.fn(() => 123);
    const factory = new CustomDataExtractorFactory(spy);
    const customExtractor = factory.createNodeDataExtractor();
    expect(customExtractor).toBeTypeOf("function");
    expect(customExtractor).not.toBe(spy);
    const dummyDoc = parseXml("<Root/>");
    expect(customExtractor(dummyDoc, xpath.select)).toBe(123);
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(dummyDoc, xpath.select);
  });

  it("should accept SingleNodeDataExtractorFnFactory in constructor and return SingleNodeDataExtractorFn", () => {
    const spy = vi.fn(() => 123);
    const spyFactory: SingleNodeDataExtractorFnFactory<number> = {
      createNodeDataExtractor(): SingleNodeDataExtractorFn<number> {
        return spy;
      },
    };
    const factory = new CustomDataExtractorFactory(spyFactory);
    const customExtractor = factory.createNodeDataExtractor();
    expect(customExtractor).toBeTypeOf("function");
    expect(customExtractor).not.toBe(spy);
    const dummyDoc = parseXml("<Root/>");
    expect(customExtractor(dummyDoc, xpath.select)).toBe(123);
    expect(spy).toHaveBeenCalledOnce();
    expect(spy).toHaveBeenCalledWith(dummyDoc, xpath.select);
  });
});
