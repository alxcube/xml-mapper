import { expect } from "vitest";
import { isComment } from "xpath";

import { isNode, isElement, isAttr, isText } from "../src";

interface CustomMatchers<R = unknown> {
  toBeNode(): R;
  toBeElement(): R;
  toBeAttr(): R;
  toBeTextNode(): R;
  toBeCommentNode(): R;
}

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend({
  toBeNode(received) {
    const { isNot } = this;
    return {
      pass: isNode(received),
      message: () => `Expected ${received} ${isNot ? " not" : ""} to be Node`,
    };
  },
  toBeElement(received) {
    const { isNot } = this;
    return {
      pass: isElement(received),
      message: () =>
        `Expected ${received} ${isNot ? " not" : ""} to be Element`,
    };
  },
  toBeAttr(received) {
    const { isNot } = this;
    return {
      pass: isAttr(received),
      message: () => `Expected ${received} ${isNot ? " not" : ""} to be Attr`,
    };
  },
  toBeTextNode(received) {
    const { isNot } = this;
    return {
      pass: isText(received),
      message: () => `Expected ${received} ${isNot ? " not" : ""} to be Text`,
    };
  },
  toBeCommentNode(received) {
    const { isNot } = this;
    return {
      pass: isComment(received),
      message: () =>
        `Expected ${received} ${isNot ? " not" : ""} to be Comment`,
    };
  },
});
