<script lang="ts">
  import type { SearchClient } from "algoliasearch/lite";
  import instantsearch, { type InstantSearch } from "instantsearch.js";
  import { setSearchContext } from "./searchContext";

  export let indexName: string;
  export let searchClient: SearchClient;

  let search: InstantSearch;

  setSearchContext({
    getSearch: () => search,
  });

  $: {
    if (searchClient) {
      search = instantsearch({ indexName, searchClient });

      search.start();
    }
  }
</script>

{#if search}
  <slot />
{/if}
