import type { IndexWidget } from "instantsearch.js/es/widgets/index/index";
import { getContext, setContext } from "svelte";

const contextKey = Symbol("InstantSearch:indexContext");

export function setIndexContext(index: IndexWidget) {
  setContext(contextKey, index);
}

export function getIndexContext() {
  return getContext<IndexWidget>(contextKey);
}
