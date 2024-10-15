// utils.js
// https://github.com/epoberezkin/fast-json-stable-stringify
import stringify from 'fast-json-stable-stringify'

export function encodeOptions(options: { returnVisitor: boolean; country: any; page: any; }) {
  const json = stringify(options)
  return encodeURI(json);
}

export function decodeOptions(path: string) {
  return JSON.parse(decodeURI(path));
}