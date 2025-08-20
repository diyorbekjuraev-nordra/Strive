import isInDOM from "./is-in-dom";
export default function hasParent(element: HTMLElement, root: HTMLElement | undefined | null) {
  return root && root.contains(element) && isInDOM(element);
}
