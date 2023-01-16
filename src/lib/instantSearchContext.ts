import type { InstantSearch } from "instantsearch.js";
import { getContext, setContext } from "svelte";

const contextKey = Symbol();

export function setInstantSearchContext(instantSearch: InstantSearch) {
  setContext(contextKey, instantSearch);
}

export function getInstantSearchContext() {
  return getContext<InstantSearch>(contextKey);
}
