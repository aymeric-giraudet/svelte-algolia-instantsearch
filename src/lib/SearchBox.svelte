<script lang="ts">
  import { connectSearchBox } from "instantsearch.js/es/connectors";

  import type { RendererOptions } from "instantsearch.js/es/types";
  import type {
    SearchBoxRenderState,
    SearchBoxConnectorParams,
  } from "instantsearch.js/es/connectors/search-box/connectSearchBox";
  import { getContext, onMount } from "svelte";
  import type { InstantSearch } from "instantsearch.js";

  // @ts-ignore
  let state: SearchBoxRenderState & RendererOptions<SearchBoxConnectorParams> =
    {};

  const { getSearch } = getContext<{ getSearch: () => InstantSearch }>("test");
  const search = getSearch();

  onMount(() => {
    const makeSearchBox = connectSearchBox((c) => {
      state = c;
    });
    const searchBox = makeSearchBox({});
    search.addWidgets([searchBox]);
  });
</script>

<form noValidate>
  <input
    type="search"
    value={state.query}
    on:input={(event) => state.refine(event.currentTarget.value)}
  />
  <button on:click={() => state.refine("")} type="button">Reset query</button>
  {state.isSearchStalled ? "My search is stalled" : ""}
</form>
