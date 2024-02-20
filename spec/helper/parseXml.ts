import { DOMParser } from "@xmldom/xmldom";
export function parseXml(xml: string): Document {
  return new DOMParser().parseFromString(xml);
}
