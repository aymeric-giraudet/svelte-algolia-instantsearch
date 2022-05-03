<script lang="ts">
  import type { SearchClient } from "algoliasearch/lite";
  import instantsearch, { type InstantSearch } from "instantsearch.js";
  import { onMount, setContext } from "svelte";

  export let indexName: string;
  export let searchClient: SearchClient;

  let search: InstantSearch;

  setContext("test", {
    getSearch: () => search,
  });

  onMount(() => {
    search = instantsearch({ indexName, searchClient });

    search.start();
  });
</script>

{#if search}
  <slot />
{/if}
