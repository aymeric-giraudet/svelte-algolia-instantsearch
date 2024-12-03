<script lang="ts">
  import type { SearchClient } from "algoliasearch/lite";
  import type { RouterProps } from "instantsearch.js/es/middlewares";
  import type { StateMapping, UiState } from "instantsearch.js";
  import InstantSearch, { type InstantSearchOptions } from "instantsearch.js/es/lib/InstantSearch";
  import { setInstantSearchContext } from "./instantSearchContext";
  import { tick } from "svelte";
  import { getServerContext } from "./getServerState";
  import { page } from "$app/stores";
  import { setIndexContext } from "./indexContext";
  import { replaceState } from "$app/navigation";
  import { onDestroyClientSide } from "./utils";
  import qs from "qs";
  import { history } from "instantsearch.js/es/lib/routers";
  import { singleIndex } from "instantsearch.js/es/lib/stateMappings";

  type $$Props = Omit<InstantSearchOptions, "searchFunction" | "insightsClients"> & {
    indexName: string;
    searchClient: SearchClient;
  };

  export let indexName: $$Props["indexName"];
  export let searchClient: $$Props["searchClient"];
  export let stalledSearchDelay: $$Props["stalledSearchDelay"] = undefined;
  export let onStateChange: $$Props["onStateChange"] = undefined;
  export let routing: $$Props["routing"] = undefined;
  export let initialUiState: $$Props["initialUiState"] = undefined;
  export let insights: $$Props["insights"] = undefined;
  export let numberLocale: $$Props["numberLocale"] = undefined;

  let search: InstantSearch;
  const serverContext = getServerContext();
  let removePopstateListener: (() => void) | undefined;

  const svelteKitRouter: RouterProps = {
    router: {
      read() {
        const url = new URL(window.location.href);
        const queryString = url.search.slice(1);
        return qs.parse(queryString) as unknown as UiState;
      },
      write(routeState) {
        const url = new URL(window.location.href);
        url.search = qs.stringify(routeState, { encode: true });
        replaceState(url.toString(), {
          algoliaState: routeState,
        });
      },
      createURL(routeState) {
        const url = new URL(window.location.href);
        url.search = "";

        Object.entries(routeState).forEach(([key, value]) => {
          if (value !== undefined) {
            url.searchParams.set(key, String(value));
          }
        });

        return url.toString();
      },
      onUpdate(callback) {
        if (typeof window !== "undefined") {
          const popstateHandler = (event: PopStateEvent) => {
            if (event.state?.algoliaState) {
              callback(event.state.algoliaState);
            }
          };
          window.addEventListener("popstate", popstateHandler);
          removePopstateListener = () => {
            window.removeEventListener("popstate", popstateHandler);
          };
        }
        return removePopstateListener;
      },
      dispose() {
        if (removePopstateListener) {
          removePopstateListener();
        }
      },
    },
    stateMapping: singleIndex(indexName) as unknown as StateMapping,
  };

  const getSKRouting = () => {
    if (typeof window === "undefined") {
      return {
        router: history({
          getLocation() {
            if (serverContext) {
              return new URL(serverContext.serverUrl) as unknown as Location;
            } else {
              let serverUrl;
              page.subscribe(({ url }) => {
                serverUrl = url;
              });
              return new URL(serverUrl!) as unknown as Location;
            }
          },
        }),
      };
    } else {
      return svelteKitRouter;
    }
  };

  $: if (searchClient) {
    search = new InstantSearch({
      indexName,
      searchClient,
      stalledSearchDelay,
      onStateChange,
      initialUiState,
      insights,
      numberLocale,
      routing: routing && getSKRouting(),
    });

    setInstantSearchContext(search);
    setIndexContext(search.mainIndex);

    if (!serverContext) {
      page.subscribe(({ data }) => {
        if (Object.keys(data).includes(indexName)) {
          search._initialResults = data;
        }
      });
    }

    search.start();

    if ("addAlgoliaAgent" in searchClient) {
      searchClient.addAlgoliaAgent("svelte-algolia-instantsearch", "1.0.0");
    }

    if (serverContext) {
      tick().then(() => {
        serverContext.notifyServer(search);
      });
    }
  }

  onDestroyClientSide(() => {
    if (search) {
      if (removePopstateListener) {
        removePopstateListener();
      }
      search.dispose();
    }
  });
</script>

{#if search}
  <slot />
{/if}
