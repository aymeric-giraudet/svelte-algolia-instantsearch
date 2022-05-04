<script lang="ts">
  import { connectHits } from "instantsearch.js/es/connectors";

  import type { RendererOptions } from "instantsearch.js/es/types";
  import type {
    HitsRenderState,
    HitsConnectorParams,
  } from "instantsearch.js/es/connectors/hits/connectHits";
  import { getContext, onDestroy, onMount } from "svelte";
  import type { InstantSearch } from "instantsearch.js";

  // @ts-ignore
  let state: HitsRenderState<Record<string, unknown>> &
    RendererOptions<HitsConnectorParams<Record<string, unknown>> & object> = {
    hits: [],
  };
  let makeHits: ReturnType<typeof connectHits>;
  let hits: ReturnType<typeof makeHits>;

  const { getSearch } = getContext<{ getSearch: () => InstantSearch }>("test");
  const search = getSearch();

  onMount(() => {
    const makeHits = connectHits((c) => {
      state = c;
    });
    const hits = makeHits({});
    search.addWidgets([hits]);
  });

  onDestroy(() => {
    search.removeWidgets([hits]);
  });
</script>

<ol>
  {#each state.hits as hit}
    <li>{hit.post_title}</li>
  {/each}
</ol>
