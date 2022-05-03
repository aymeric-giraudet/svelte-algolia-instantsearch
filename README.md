# svelte-algolia-instantsearch

This is a Svelte component library for Algolia's InstantSearch.js.
Connectors were used as a mean to map provided state to our Svelte components.

## Usagee

```html
<script lang="ts">
  import { InstantSearch, SearchBox, Hits } from "svelte-algolia-instantsearch";
  import { onMount } from "svelte";
  import algoliasearch, { type SearchClient } from "algoliasearch/lite";

  let searchClient: SearchClient;

  onMount(() => {
    searchClient = algoliasearch(
      "<YOUR_API_KEY>",
      "<YOUR_SEARCH_KEY>"
    );
  });
</script>

{#if searchClient}
  <InstantSearch indexName="test" {searchClient}>
    <SearchBox />
    <Hits />
  </InstantSearch>
{/if}
```
