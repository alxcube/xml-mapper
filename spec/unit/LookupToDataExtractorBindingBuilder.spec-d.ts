import { describe, expectTypeOf, it } from "vitest";
import type {
  DependentOfConvertedType,
  DependentOfDefaultValueType,
  DependentOfLookupResult,
  DependentOfLookupResultAndConvertedTypeAndDefaultValueType,
} from "../../src";

describe("DependentOfLookupResult type", () => {
  it("should return DependentType | undefined when lookup result extends undefined", () => {
    expectTypeOf<
      DependentOfLookupResult<Node | undefined, string>
    >().toEqualTypeOf<string | undefined>();

    expectTypeOf<
      DependentOfLookupResult<Element | undefined, string>
    >().toEqualTypeOf<string | undefined>();

    expectTypeOf<
      DependentOfLookupResult<Attr | undefined, string>
    >().toEqualTypeOf<string | undefined>();
  });

  it("should return DependentType when lookup result is non-nullable", () => {
    expectTypeOf<
      DependentOfLookupResult<Node, string>
    >().toEqualTypeOf<string>();

    expectTypeOf<
      DependentOfLookupResult<Element, string>
    >().toEqualTypeOf<string>();

    expectTypeOf<
      DependentOfLookupResult<Attr, string>
    >().toEqualTypeOf<string>();

    expectTypeOf<
      DependentOfLookupResult<Node, string | undefined>
    >().toEqualTypeOf<string | undefined>();
  });
});

describe("DependentOfDefaultValueType type", () => {
  it("should return MainType when DefaultValueType is undefined", () => {
    expectTypeOf<
      DependentOfDefaultValueType<string, undefined>
    >().toEqualTypeOf<string>();
    expectTypeOf<
      DependentOfDefaultValueType<string | undefined, undefined>
    >().toEqualTypeOf<string | undefined>();
  });

  it("should return given MainType when MainType is non-nullable, ignoring DefaultValueType", () => {
    expectTypeOf<
      DependentOfDefaultValueType<Node, Element>
    >().toEqualTypeOf<Node>();
  });

  it("should return MainType | DefaultValueType, when MainType extends undefined", () => {
    expectTypeOf<
      DependentOfDefaultValueType<Node | undefined, Element>
    >().toEqualTypeOf<Node | Element>();

    expectTypeOf<
      DependentOfDefaultValueType<Node | undefined, Element | undefined>
    >().toEqualTypeOf<Node | Element | undefined>();
  });
});

describe("DependentOfConvertedType type", () => {
  it("should return ConvertedType, when it is not never", () => {
    expectTypeOf<
      DependentOfConvertedType<number, string>
    >().toEqualTypeOf<number>();
    expectTypeOf<
      DependentOfConvertedType<{ title: string }, string[]>
    >().toEqualTypeOf<{ title: string }>();
  });

  it("should return SourceType, when ConvertedType is never", () => {
    expectTypeOf<
      DependentOfConvertedType<never, string>
    >().toEqualTypeOf<string>();
  });
});

describe("DependentOfLookupResultAndConvertedTypeAndDefaultValueType type", () => {
  it("should return result, equal to DependentOfLookupResult, when only 2 type arguments given", () => {
    expectTypeOf<
      DependentOfLookupResultAndConvertedTypeAndDefaultValueType<
        Node | undefined,
        string
      >
    >().toEqualTypeOf<DependentOfLookupResult<Node | undefined, string>>();

    expectTypeOf<
      DependentOfLookupResultAndConvertedTypeAndDefaultValueType<Node, string>
    >().toEqualTypeOf<DependentOfLookupResult<Node, string>>();

    expectTypeOf<
      DependentOfLookupResultAndConvertedTypeAndDefaultValueType<
        Node,
        string | undefined
      >
    >().toEqualTypeOf<DependentOfLookupResult<Node, string | undefined>>();
  });

  it("should return ConvertedType, unless it is 'never'", () => {
    expectTypeOf<
      DependentOfLookupResultAndConvertedTypeAndDefaultValueType<
        Node,
        string,
        number
      >
    >().toEqualTypeOf<number>();
    expectTypeOf<
      DependentOfLookupResultAndConvertedTypeAndDefaultValueType<
        Node | undefined,
        string,
        number
      >
    >().toEqualTypeOf<number | undefined>();
    expectTypeOf<
      DependentOfLookupResultAndConvertedTypeAndDefaultValueType<
        Node,
        string,
        number | undefined
      >
    >().toEqualTypeOf<number | undefined>();
  });

  it("should return non-nullable type, when DefaultValueType is non-nullable", () => {
    expectTypeOf<
      DependentOfLookupResultAndConvertedTypeAndDefaultValueType<
        Node | undefined,
        string,
        never,
        string
      >
    >().toEqualTypeOf<string>();
    expectTypeOf<
      DependentOfLookupResultAndConvertedTypeAndDefaultValueType<
        Node | undefined,
        string,
        number,
        number
      >
    >().toEqualTypeOf<number>();
    expectTypeOf<
      DependentOfLookupResultAndConvertedTypeAndDefaultValueType<
        Node | undefined,
        Node,
        never,
        Element
      >
    >().toEqualTypeOf<Node | Element>();
  });

  it("should not return DefaultValueType, when LookupResultType is non-nullable", () => {
    expectTypeOf<
      DependentOfLookupResultAndConvertedTypeAndDefaultValueType<
        Node,
        Node,
        never,
        Element
      >
    >().toEqualTypeOf<Node>();
  });

  it("should return nullable type when DefaultValueType is nullable and LookupResultType is nullable", () => {
    expectTypeOf<
      DependentOfLookupResultAndConvertedTypeAndDefaultValueType<
        Node | undefined,
        Node,
        never,
        Element | undefined
      >
    >().toEqualTypeOf<Node | Element | undefined>();
  });
});
