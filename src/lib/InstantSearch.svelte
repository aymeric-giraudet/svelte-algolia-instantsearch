<script lang="ts">
  import type { SearchClient } from "algoliasearch/lite";
  import instantsearch, { type InstantSearch } from "instantsearch.js";
  import { setInstantSearchContext } from "./instantSearchContext";
  import { onDestroy, tick } from "svelte";
  import { getServerContext } from "./getServerState";
  import { page } from "$app/stores";

  export let indexName: string;
  export let searchClient: SearchClient;
  export let stalledSearchDelay: number | undefined = undefined;

  let search: InstantSearch;

  const serverContext = getServerContext();

  $: {
    if (searchClient) {
      search = instantsearch({
        indexName,
        searchClient,
        stalledSearchDelay,
      });

      setInstantSearchContext(search);

      if (!serverContext) {
        page.subscribe(({ data }) => {
          search._initialResults = data;
        });
      }

      search.start();

      if (serverContext) {
        tick().then(() => {
          serverContext.notifyServer(search);
        });
      }
    }
  }

  onDestroy(() => {
    if (!serverContext) {
      search.dispose();
    }
  });
</script>

{#if search}
  <slot />
{/if}
