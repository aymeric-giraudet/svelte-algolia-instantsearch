# svelte-algolia-instantsearch

This library is a community-developed wrapper around [instantsearch.js](https://github.com/algolia/instantsearch) for Svelte.

It is meant to be an equivalent of [react-instantsearch-hooks-web](https://github.com/algolia/instantsearch/tree/master/packages/react-instantsearch-hooks-web) for Svelte, exposing a similar API.

## Installation

```sh
yarn add svelte-algolia-instantsearch algoliasearch
# or
npm install svelte-algolia-instantsearch algoliasearch
```

## Basic usage

```svelte
<script>
  import {
    InstantSearch,
    SearchBox,
    Hits,
    Pagination,
    HitsPerPage,
  } from "svelte-algolia-instantsearch";
  import algoliasearch from "algoliasearch/lite";

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

## Compatibility with SvelteKit SSR

As `instantsearch.js` is currently not compatible with Node.js ESM modules, you need to add the following to the `noExternal` array in your `vite.config.js` file:

```js
ssr: {
  noExternal: ["instantsearch.js"],
},
```

This slows down the build time and outputs larger files, but it's the only way to make it work for now.

## API

### `connect`

The most important part of this library is the `connect` function, which creates and adds a widget to the InstantSearch instance, and returns a Svelte readable store.

Here's an example of how you can use it to build your own components :

```svelte
<script>
  import { connect } from "svelte-algolia-instantsearch";
  import { connectStats } from "instantsearch.js/es/connectors";

  const state = connect(connectStats);
  $: ({ nbHits, processingTimeMS } = $state);
</script>

<p>Found {nbHits} results in {processingTimeMS}ms</p>
```

### Components

It's still a work in progress, but you can use some pre-made components to build your search UI :

- [ ] Breadcrumb
- [ ] Configure
- [X] ClearRefinements
- [ ] CurrentRefinements
- [ ] DynamicWidgets
- [ ] HierarchicalMenu
- [ ] Highlight
- [X] Hits
- [X] HitsPerPage
- [ ] Index
- [ ] InfiniteHits
- [ ] Menu
- [X] Pagination
- [X] PoweredBy
- [ ] RangeInput
- [X] RefinementList
- [X] SearchBox
- [ ] Snippet
- [ ] SortBy
- [X] ToggleRefinement

### `getInstantSearchContext`

This function returns the instance of `InstantSearch` that was instantiated by the `<InstantSearch>` component.

It can be useful if you want to use the `instantsearch.js` API directly, for example to add a custom middleware.

```svelte
<script>
  import { getInstantSearchContext } from "$lib";
  import { createInsightsMiddleware } from "instantsearch.js/es/middlewares";
  import { onMount } from "svelte";

  const search = getInstantSearchContext();

  onMount(() => {
    const insightsMiddleware = createInsightsMiddleware({ /* ... */ });
    search.use(insightsMiddleware);
    return () => {
      search.unuse(insightsMiddleware);
    };
  });
</script>
```