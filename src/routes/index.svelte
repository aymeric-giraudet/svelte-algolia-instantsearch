<script lang="ts">
  import { InstantSearch, SearchBox, Hits } from "$lib";
  import { onMount } from "svelte";
  import algoliasearch, { type SearchClient } from "algoliasearch/lite";

  let searchClient: SearchClient;

  onMount(() => {
    searchClient = algoliasearch(
      "4RH55M3WZM",
      "fe3dc86023e549e79e3348785a2aff9f"
    );
  });
</script>

{#if searchClient}
  <InstantSearch indexName="test" {searchClient}>
    <SearchBox />
    <Hits />
  </InstantSearch>
{/if}
