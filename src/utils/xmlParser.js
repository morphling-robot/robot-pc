export default function (str) {
  const parser = new DOMParser();
  return parser.parseFromString(str, 'text/xml').firstChild;
}