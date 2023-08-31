import type { InstantSearch } from "instantsearch.js";
import { getInitialResults, waitForResults } from "instantsearch.js/es/lib/server";
import { getContext } from "svelte";

const serverContext = Symbol("InstantSearch:serverContext");

export const getServerContext = () =>
  getContext<{ notifyServer: (search: InstantSearch) => void }>(serverContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
