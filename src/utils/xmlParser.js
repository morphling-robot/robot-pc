export default function xmlParser(str) {
  const parser = new DOMParser();
  return parser.parseFromString(str, 'text/xml').firstChild;
}