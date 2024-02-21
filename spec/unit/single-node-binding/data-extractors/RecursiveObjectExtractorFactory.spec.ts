import { beforeEach, describe, expect, it } from "vitest";
import xpath from "xpath";
import {
  RecursiveObjectExtractorFactory,
  type RecursiveObjectFactory,
} from "../../../../src";
import { parseXml } from "../../../helper/parseXml";

describe("RecursiveObjectExtractorFactory class", () => {
  interface TestRecursiveObject {
    title: string;
    child?: TestRecursiveObject;
  }

  let recursiveObjectFactory: RecursiveObjectFactory<TestRecursiveObject>;
  let recursiveObjectExtractorFactory: RecursiveObjectExtractorFactory<TestRecursiveObject>;
  let dummyDoc: Document;

  beforeEach(() => {
    recursiveObjectFactory = (recursion) => {
      return {
        title: () => `Level ${recursion.getDepth()}`,
        child:
          recursion.getDepth() < 2
            ? new RecursiveObjectExtractorFactory(recursion)
            : () => undefined,
      };
    };

    recursiveObjectExtractorFactory =
      new RecursiveObjectExtractorFactory<TestRecursiveObject>(
        recursiveObjectFactory
      );

    dummyDoc = parseXml("<Root/>");
  });

  describe("createNodeDataExtractor() method", () => {
    it("should return function that creates recursive object", () => {
      expect(
        recursiveObjectExtractorFactory.createNodeDataExtractor()(
          dummyDoc,
          xpath.select
        )
      ).toEqual({
        title: "Level 0",
        child: {
          title: "Level 1",
          child: {
            title: "Level 2",
          },
        },
      });
    });
  });

  describe("getDepth() method", () => {
    it("should return 0 when RecursiveObjectExtractorFactory was initialized with RecursiveObjectFactory callback", () => {
      expect(recursiveObjectExtractorFactory.getDepth()).toBe(0);
    });

    it("should return depth, depending on passed RecursiveObjectFactoryScope depth", () => {
      const level1 = new RecursiveObjectExtractorFactory(
        recursiveObjectExtractorFactory
      );
      const level2 = new RecursiveObjectExtractorFactory(level1);
      const anotherLevel1 = new RecursiveObjectExtractorFactory(
        recursiveObjectExtractorFactory
      );

      expect(level1.getDepth()).toBe(1);
      expect(anotherLevel1.getDepth()).toBe(1);
      expect(level2.getDepth()).toBe(2);
    });
  });

  describe("getRecursiveObjectFactory() method", () => {
    it("should return RecursiveObjectFactoryCallback, passed to initial RecursiveObjectExtractorFactory at any recursion depth", () => {
      const level1 = new RecursiveObjectExtractorFactory(
        recursiveObjectExtractorFactory
      );
      const level2 = new RecursiveObjectExtractorFactory(level1);
      const level3 = new RecursiveObjectExtractorFactory(level2);
      const anotherLevel1 = new RecursiveObjectExtractorFactory(
        recursiveObjectExtractorFactory
      );

      expect(recursiveObjectExtractorFactory.getRecursiveObjectFactory()).toBe(
        recursiveObjectFactory
      );
      expect(level1.getRecursiveObjectFactory()).toBe(recursiveObjectFactory);
      expect(level2.getRecursiveObjectFactory()).toBe(recursiveObjectFactory);
      expect(level3.getRecursiveObjectFactory()).toBe(recursiveObjectFactory);
      expect(anotherLevel1.getRecursiveObjectFactory()).toBe(
        recursiveObjectFactory
      );
    });
  });
});
