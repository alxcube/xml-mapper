export function getNodeTypeName(node: Node): string {
  switch (node.nodeType) {
    case node.ELEMENT_NODE:
      return "Element";
    case node.ATTRIBUTE_NODE:
      return "Attr";
    case node.TEXT_NODE:
      return "Text";
    case node.CDATA_SECTION_NODE:
      return "CDATASection";
    case node.PROCESSING_INSTRUCTION_NODE:
      return "ProcessingInstruction";
    case node.COMMENT_NODE:
      return "Comment";
    case node.DOCUMENT_NODE:
      return "Document";
    case node.DOCUMENT_TYPE_NODE:
      return "DocumentType";
    case node.DOCUMENT_FRAGMENT_NODE:
      return "DocumentFragment";
    default:
      return "Unknown Node Type";
  }
}
