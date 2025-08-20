export default function isInDom(obj: HTMLElement) {
  return Boolean(obj.closest("body"));
}
