# svelte-algolia-instantsearch

This is a Svelte component library for Algolia's InstantSearch.js.

Connectors were used as a mean to map provided state to our Svelte components.

Widgets markup were inspired by [react-instantsearch-hooks-web](https://github.com/algolia/react-instantsearch/tree/master/packages/react-instantsearch-hooks-web/src/ui), as well as some helpers were taken from [react-instantsearch-hooks](https://github.com/algolia/react-instantsearch/tree/master/packages/react-instantsearch-hooks)

## Installation

```sh
yarn add svelte-algolia-instantsearch algoliasearch
# or
npm install svelte-algolia-instantsearch algoliasearch
```

## Basic usage

```svelte
<script lang="ts">
  import {
    InstantSearch,
    SearchBox,
    Hits,
    Pagination,
    HitsPerPage,
  } from "svelte-algolia-instantsearch";
  import algoliasearch, { type SearchClient } from "algoliasearch/lite";

  const searchClient = algoliasearch("<YOUR_API_KEY>", "<YOUR_SEARCH_KEY>");
</script>

<InstantSearch indexName="test" {searchClient}>
  <SearchBox />

  <Hits let:hit>
    <img src={hit.author_image_url} alt={hit.author_name} />
    {hit.post_title} by {hit.author_name}
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

## Compatibility with SvelteKit SSR / `vite-ssr`

As `instantsearch.js` is currently not compatible with Node.js ESM modules, you need to add the following to the `noExternal` array in your `vite.config.js` file:

```js
ssr: {
  noExternal: ["instantsearch.js"],
},
```

This slows down the build time and outputs larger files, but it's the only way to make it work for now.
