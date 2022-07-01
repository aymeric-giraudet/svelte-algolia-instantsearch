<script lang="ts">
  import {
    InstantSearch,
    SearchBox,
    Hits,
    Pagination,
    HitsPerPage,
  } from "$lib";
  import { onMount } from "svelte";
  import algoliasearch, { type SearchClient } from "algoliasearch/lite";

  let searchClient: SearchClient;

  const test = new Hits<{ label: string }>({ });

  onMount(() => {
    searchClient = algoliasearch(
      "4RH55M3WZM",
      "fe3dc86023e549e79e3348785a2aff9f"
    );
  });
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
