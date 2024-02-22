import type { NodesArrayLookupResult } from "./NodesArrayLookupFn";
import type {
  DependentOfDefaultValue,
  SingleNodeDataExtractorFnFactory,
} from "../single-node-binding";

export type DependentOfNodesArrayLookupResult<
  ArrayLookupResult extends NodesArrayLookupResult,
  ArrayDataExtractorReturnType,
> = ArrayLookupResult extends undefined
  ? ArrayDataExtractorReturnType | undefined
  : ArrayDataExtractorReturnType;

export type DependentOfNodesArrayLookupResultAndDefaultValue<
  ArrayLookupResult extends NodesArrayLookupResult,
  ArrayDataExtractorReturnType,
  DefaultValueType extends ArrayDataExtractorReturnType | undefined,
> = DependentOfDefaultValue<
  DependentOfNodesArrayLookupResult<
    ArrayLookupResult,
    ArrayDataExtractorReturnType
  >,
  DefaultValueType
>;
export interface NodesArrayBindingBuilder<
  ArrayLookupResult extends NodesArrayLookupResult,
  ArrayDataExtractorReturnType,
  DefaultValueType extends ArrayDataExtractorReturnType | undefined = undefined,
> extends SingleNodeDataExtractorFnFactory<
    DependentOfNodesArrayLookupResultAndDefaultValue<
      ArrayLookupResult,
      ArrayDataExtractorReturnType,
      DefaultValueType
    >
  > {
  withDefault<
    GivenDefaultValueType extends ArrayDataExtractorReturnType | undefined,
  >(
    defaultValue: GivenDefaultValueType
  ): NodesArrayBindingBuilder<
    ArrayLookupResult,
    ArrayDataExtractorReturnType,
    GivenDefaultValueType
  >;

  named(
    name: string
  ): NodesArrayBindingBuilder<
    ArrayLookupResult,
    ArrayDataExtractorReturnType,
    DefaultValueType
  >;
}
