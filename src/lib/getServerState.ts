import type { InitialResults, InstantSearch } from "instantsearch.js";
import { isIndexWidget } from "instantsearch.js/es/lib/utils";
import type { IndexWidget } from "instantsearch.js/es/widgets/index/index";
import { getContext } from "svelte";

const serverContext = Symbol("InstantSearch:serverContext");

export const getServerContext = () =>
  getContext<{ notifyServer: (search: InstantSearch) => void }>(serverContext);

export function getServerState(component: any): Promise<Record<string, any>> {
  return new Promise((resolve) => {
    const notifyServer = async (search: InstantSearch) => {
      await waitForResults(search);
      const results = getInitialResults(search.mainIndex);
      search.dispose();
      resolve(results);
    };
    component.render({}, { context: new Map([[serverContext, { notifyServer }]]) });
  });
}

/**
 * Waits for the results from the search instance to coordinate the next steps
 * in `getServerState()`.
 */
function waitForResults(search: InstantSearch) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const helper = search.mainHelper!;

  helper.searchOnlyWithDerivedHelpers();

  return new Promise<void>((resolve, reject) => {
    // All derived helpers resolve in the same tick so we're safe only relying
    // on the first one.
    helper.derivedHelpers[0].on("result", () => {
      resolve();
    });

    // However, we listen to errors that can happen on any derived helper because
    // any error is critical.
    helper.on("error", (error) => reject(error));
    search.on("error", (error) => reject(error));
    helper.derivedHelpers.forEach((derivedHelper) =>
      derivedHelper.on("error", (error) => {
        reject(error);
      })
    );
  });
}

/**
 * Recurse over all child indices
 */
function walkIndex(indexWidget: IndexWidget, callback: (widget: IndexWidget) => void) {
  callback(indexWidget);

  return indexWidget.getWidgets().forEach((widget) => {
    if (!isIndexWidget(widget)) {
      return;
    }

    callback(widget);
    walkIndex(widget, callback);
  });
}

/**
 * Walks the InstantSearch root index to construct the initial results.
 */
function getInitialResults(rootIndex: IndexWidget): InitialResults {
  const initialResults: InitialResults = {};

  walkIndex(rootIndex, (widget) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const searchResults = widget.getResults()!;
    initialResults[widget.getIndexId()] = {
      // We convert the Helper state to a plain object to pass parsable data
      // structures from server to client.
      state: { ...searchResults._state },
      results: searchResults._rawResults,
    };
  });

  return initialResults;
}
