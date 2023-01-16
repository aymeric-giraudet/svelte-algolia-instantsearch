<script lang="ts">
  import type { SearchClient } from "algoliasearch/lite";
  import instantsearch, { type InstantSearch } from "instantsearch.js";
  import { setInstantSearchContext } from "./instantSearchContext";

  export let indexName: string;
  export let searchClient: SearchClient;
  export let stalledSearchDelay: number | undefined = undefined;

  let search: InstantSearch;

  $: {
    if (searchClient) {
      search = instantsearch({ indexName, searchClient, stalledSearchDelay });

      setInstantSearchContext(search);

      search.start();
    }
  }
</script>

{#if search}
  <slot />
{/if}
