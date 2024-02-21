import xpath from "xpath";
import { bind } from "./BaseBindingInitializer";
import type { ObjectBlueprint } from "./ObjectBlueprint";
import { RecursiveObjectExtractorFactory } from "./single-node-binding";

interface Test {
  title: string;
  child?: Test;
}

const binding = bind()
  .toElement("t")
  .mandatory()
  .asRecursiveObject<Test>((recursion) => {
    return {
      title: () => "Title",
      child: () =>
        recursion.getDepth() < 5
          ? new RecursiveObjectExtractorFactory(recursion)
          : undefined,
    } as ObjectBlueprint<Test>;
  });

const val = binding.createNodeDataExtractor()(document, xpath.select);
