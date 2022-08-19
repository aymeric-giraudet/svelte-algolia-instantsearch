import type {
  Connector,
  WidgetDescription,
  InstantSearch,
} from "instantsearch.js";
import type { IndexWidget } from "instantsearch.js/es/widgets/index/index";
import { onMount, getContext } from "svelte";
import { readable, writable, type Readable } from "svelte/store";

import algoliasearchHelper from "algoliasearch-helper";

import type { SearchParameters } from "algoliasearch-helper";

export function createSearchResults<THit>(state: SearchParameters) {
  return new algoliasearchHelper.SearchResults<THit>(
    state,
    [
      {
        query: state.query ?? "",
        page: state.page ?? 0,
        hitsPerPage: state.hitsPerPage ?? 20,
        hits: [],
        nbHits: 0,
        nbPages: 0,
        params: "",
        exhaustiveNbHits: true,
        exhaustiveFacetsCount: true,
        processingTimeMS: 0,
        index: state.index,
      },
    ],
    {
      /** used by connectors to prevent persisting these results */
      __isArtificial: true,
    }
  );
}

export function getIndexSearchResults(indexWidget: IndexWidget) {
  const helper = indexWidget.getHelper()!;
  const results =
    // On SSR, we get the results injected on the Index.
    indexWidget.getResults() ||
    // On the browser, we create fallback results based on the helper state.
    createSearchResults(helper.state);
  const scopedResults = indexWidget.getScopedResults().map((scopedResult) => {
    const fallbackResults =
      scopedResult.indexId === indexWidget.getIndexId()
        ? results
        : createSearchResults(scopedResult.helper.state);

    return {
      ...scopedResult,
      // We keep `results` from being `null`.
      results: scopedResult.results || fallbackResults,
    };
  });

  return {
    results,
    scopedResults,
  };
}

// With some tricky typing voodoo we're able to get proper state type inference when using connect
type ExtractStateType<T extends (...args: any) => any> =
  | Parameters<Parameters<T>[0]>[0];

export default function connect<
  T extends Connector<WidgetDescription, Record<string, unknown>>
>(
  connector: T,
  widgetParams: Parameters<ReturnType<T>>[0] = {}
): Readable<ExtractStateType<T>> {
  const { getSearch } = getContext<{ getSearch: () => InstantSearch }>(
    "algolia"
  );
  const search = getSearch();
  const mainIndex = search.mainIndex;

  const writableState = writable<ExtractStateType<T>>();
  const widget = connector(writableState.set)(widgetParams);

  onMount(() => {
    mainIndex.addWidgets([widget]);

    return () => {
      mainIndex.removeWidgets([widget]);
    };
  });

  let initialState: ExtractStateType<T> = {} as ExtractStateType<T>;

  if (widget.getWidgetRenderState) {
    // The helper exists because we've started InstantSearch.
    const helper = mainIndex.getHelper()!;
    //@ts-ignore
    const uiState = mainIndex.getWidgetUiState({})[mainIndex.getIndexId()];
    helper.state =
      widget.getWidgetSearchParameters?.(helper.state, { uiState }) ||
      helper.state;
    const { results, scopedResults } = getIndexSearchResults(mainIndex);

    // We get the widget render state by providing the same parameters as
    // InstantSearch provides to the widget's `render` method.
    // See https://github.com/algolia/instantsearch.js/blob/019cd18d0de6dd320284aa4890541b7fe2198c65/src/widgets/index/index.ts#L604-L617
    const { widgetParams, ...renderState } = widget.getWidgetRenderState({
      helper,
      parent: mainIndex,
      instantSearchInstance: search,
      results,
      scopedResults,
      state: helper.state,
      renderState: search.renderState,
      templatesConfig: search.templatesConfig,
      createURL: mainIndex.createURL,
      searchMetadata: {
        isSearchStalled: search._isSearchStalled,
      },
    });

    initialState = renderState as ExtractStateType<T>;
  }

  writableState.set(initialState);

  return readable<ExtractStateType<T>>(initialState, (set) => {
    writableState.subscribe(set);
  });
}
