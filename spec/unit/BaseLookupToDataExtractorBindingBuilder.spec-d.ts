import { describe, expectTypeOf, it } from "vitest";
import type {
  NodesArrayDataExtractorFnFactory,
  NodesArrayLookupBuilder,
  SingleNodeDataExtractorFnFactory,
  SingleNodeLookupBuilder,
  DataExtractorFactoryTypeDependentOfLookupResult,
  LookupReturnTypeDependentOfLookupBuilder,
} from "../../src";

describe("LookupReturnTypeDependentOfLookupBuilder type", () => {
  it("should infer return type of lookup builder", () => {
    expectTypeOf<
      LookupReturnTypeDependentOfLookupBuilder<SingleNodeLookupBuilder<Node>>
    >().toEqualTypeOf<Node>();
    expectTypeOf<
      LookupReturnTypeDependentOfLookupBuilder<
        SingleNodeLookupBuilder<Node | undefined>
      >
    >().toEqualTypeOf<Node | undefined>();
    expectTypeOf<
      LookupReturnTypeDependentOfLookupBuilder<SingleNodeLookupBuilder<Element>>
    >().toEqualTypeOf<Element>();
    expectTypeOf<
      LookupReturnTypeDependentOfLookupBuilder<
        SingleNodeLookupBuilder<Element | undefined>
      >
    >().toEqualTypeOf<Element | undefined>();

    expectTypeOf<
      LookupReturnTypeDependentOfLookupBuilder<NodesArrayLookupBuilder<Node[]>>
    >().toEqualTypeOf<Node[]>();
    expectTypeOf<
      LookupReturnTypeDependentOfLookupBuilder<
        NodesArrayLookupBuilder<Node[] | undefined>
      >
    >().toEqualTypeOf<Node[] | undefined>();
    expectTypeOf<
      LookupReturnTypeDependentOfLookupBuilder<NodesArrayLookupBuilder<Attr[]>>
    >().toEqualTypeOf<Attr[]>();
    expectTypeOf<
      LookupReturnTypeDependentOfLookupBuilder<
        NodesArrayLookupBuilder<Attr[] | undefined>
      >
    >().toEqualTypeOf<Attr[] | undefined>();
  });
});

describe("DataExtractorFactoryTypeDependentOfLookupResult type", () => {
  it("should return SingleNodeDataExtractorFnFactory, when LookupResultType extends Node", () => {
    expectTypeOf<
      DataExtractorFactoryTypeDependentOfLookupResult<Node, string>
    >().toEqualTypeOf<SingleNodeDataExtractorFnFactory<string>>();
    expectTypeOf<
      DataExtractorFactoryTypeDependentOfLookupResult<Node | undefined, string>
    >().toEqualTypeOf<SingleNodeDataExtractorFnFactory<string>>();
    expectTypeOf<
      DataExtractorFactoryTypeDependentOfLookupResult<Element, string>
    >().toEqualTypeOf<SingleNodeDataExtractorFnFactory<string>>();
    expectTypeOf<
      DataExtractorFactoryTypeDependentOfLookupResult<
        Element | undefined,
        string
      >
    >().toEqualTypeOf<SingleNodeDataExtractorFnFactory<string>>();
    expectTypeOf<
      DataExtractorFactoryTypeDependentOfLookupResult<Attr, string>
    >().toEqualTypeOf<SingleNodeDataExtractorFnFactory<string>>();
    expectTypeOf<
      DataExtractorFactoryTypeDependentOfLookupResult<Attr | undefined, string>
    >().toEqualTypeOf<SingleNodeDataExtractorFnFactory<string>>();
  });

  it("should return NodesArrayDataExtractorFnFactory, when LookupResultType extends Node[]", () => {
    expectTypeOf<
      DataExtractorFactoryTypeDependentOfLookupResult<Node[], string>
    >().toEqualTypeOf<NodesArrayDataExtractorFnFactory<string>>();
    expectTypeOf<
      DataExtractorFactoryTypeDependentOfLookupResult<
        Node[] | undefined,
        string
      >
    >().toEqualTypeOf<NodesArrayDataExtractorFnFactory<string>>();
    expectTypeOf<
      DataExtractorFactoryTypeDependentOfLookupResult<Element[], string>
    >().toEqualTypeOf<NodesArrayDataExtractorFnFactory<string>>();
    expectTypeOf<
      DataExtractorFactoryTypeDependentOfLookupResult<
        Element[] | undefined,
        string
      >
    >().toEqualTypeOf<NodesArrayDataExtractorFnFactory<string>>();
    expectTypeOf<
      DataExtractorFactoryTypeDependentOfLookupResult<Attr[], string>
    >().toEqualTypeOf<NodesArrayDataExtractorFnFactory<string>>();
    expectTypeOf<
      DataExtractorFactoryTypeDependentOfLookupResult<
        Attr[] | undefined,
        string
      >
    >().toEqualTypeOf<NodesArrayDataExtractorFnFactory<string>>();
  });
});
