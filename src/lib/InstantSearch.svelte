<script lang="ts">
  import type { SearchClient } from "algoliasearch/lite";
  import InstantSearch from "instantsearch.js/es/lib/InstantSearch";
  import { setInstantSearchContext } from "./instantSearchContext";
  import { tick } from "svelte";
  import { getServerContext } from "./getServerState";
  import { page } from "$app/stores";
  import { setIndexContext } from "./indexContext";
  import { onDestroyClientSide } from "./utils";

  export let indexName: string;
  export let searchClient: SearchClient;
  export let stalledSearchDelay: number | undefined = undefined;

  let search: InstantSearch;

  const serverContext = getServerContext();

  $: if (searchClient) {
    search = new InstantSearch({
      indexName,
      searchClient,
      stalledSearchDelay,
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

    if('addAlgoliaAgent' in searchClient) {
      searchClient.addAlgoliaAgent("svelte-algolia-instantsearch", "1.0.0");
    }

    if (serverContext) {
      tick().then(() => {
        serverContext.notifyServer(search);
      });
    }
  }

  onDestroyClientSide(() => {
    search.dispose();
  });
</script>

{#if search}
  <slot />
{/if}
