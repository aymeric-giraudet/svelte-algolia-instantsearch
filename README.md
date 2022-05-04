# svelte-algolia-instantsearch

This is a Svelte component library for Algolia's InstantSearch.js.

Connectors were used as a mean to map provided state to our Svelte components.

## Installation

```sh
yarn add svelte-algolia-instantsearch algoliasearch
# or
npm install svelte-algolia-instantsearch algoliasearch
```

## Basic usage

```html
<script lang="ts">
  import { InstantSearch, SearchBox, Hits, Pagination, HitsPerPage } from "svelte-algolia-instantsearch";
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

<InstantSearch indexName="test" {searchClient}>
  <SearchBox />

  <Hits>
    <div slot="item" let:hit>
      <img src={hit.author_image_url} alt={hit.author_name} />
      {hit.post_title} by {hit.author_name}
    </div>
  </Hits>

  <div style="display:flex;">
    <Pagination />
    <HitsPerPage
      defaultRefinement={5}
      items={[
        { value: 5, label: "Show 5 hits" },
        { value: 10, label: "Show 10 hits" },
      ]}
    />
  </div>
</InstantSearch>
```
