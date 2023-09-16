# svelte-algolia-instantsearch

This library is a community-developed wrapper around [instantsearch.js](https://github.com/algolia/instantsearch) for Svelte.

It is meant to be an equivalent of [react-instantsearch-hooks-web](https://github.com/algolia/instantsearch/tree/master/packages/react-instantsearch-hooks-web) for Svelte, exposing a similar API.

> [!IMPORTANT]
> This library **only works with SvelteKit**. It is now the default when you bootstrap a Svelte project.

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

<InstantSearch indexName="<YOUR_INDEX_NAME>" routing {searchClient}>
  <SearchBox />

  <Hits let:hit>
    <img src={hit.author_image_url} alt={hit.author_name} />
    {hit.post_title} by {hit.author_name}
  </Hits>

  <div style="display:flex;">
    <Pagination />
    <HitsPerPage
      items={[
        { value: 5, label: "Show 5 hits", default: true },
        { value: 10, label: "Show 10 hits" },
      ]}
    />
  </div>
</InstantSearch>
```

## Compatibility with SvelteKit SSR

> **Warning**
> If you are using `pnpm` as a package manager, [please check this issue if you have an error while running your dev script](https://github.com/aymeric-giraudet/svelte-algolia-instantsearch/issues/8#issuecomment-1456561953)

If you want your page to be fully rendered on the server, which is great for SEO, simply add a `+page.server.js` file next to your `+page.svelte` file, which should contain the following lines :

```js
import { getServerState } from "svelte-algolia-instantsearch";

import Page from "./+page.svelte";

export const load = ({ url }) => getServerState(Page, url);
```

Now you can check in your network tab that the page containing hits and facets is fully rendered on the server 😁

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

- [X] Breadcrumb
- [x] Configure
- [x] ClearRefinements
- [X] CurrentRefinements
- [ ] DynamicWidgets
- [X] HierarchicalMenu
- [x] Highlight
- [x] Hits
- [x] HitsPerPage
- [x] Index
- [x] InfiniteHits
- [X] Menu
- [x] Pagination
- [x] PoweredBy
- [X] RangeInput
- [x] RefinementList
- [x] SearchBox
- [x] Snippet
- [x] SortBy
- [x] Stats
- [x] ToggleRefinement

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
    const insightsMiddleware = createInsightsMiddleware({
      /* ... */
    });
    search.use(insightsMiddleware);
    return () => {
      search.unuse(insightsMiddleware);
    };
  });
</script>
```
