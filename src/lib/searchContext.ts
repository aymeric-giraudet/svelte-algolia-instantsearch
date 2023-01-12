import type { InstantSearch } from "instantsearch.js";
import { getContext, setContext } from "svelte";

const contextKey = Symbol();

type SearchContext = {
  getSearch: () => InstantSearch;
};

export function setSearchContext(context: SearchContext) {
  setContext<SearchContext>(contextKey, context);
}

export function getSearchContext() {
  return getContext<SearchContext>(contextKey);
}
