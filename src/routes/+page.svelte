<script lang="ts">
  import {
    InstantSearch,
    SearchBox,
    Hits,
    Pagination,
    HitsPerPage,
    PoweredBy,
    RefinementList,
    ClearRefinements,
  } from "$lib";
  import ToggleRefinement from "$lib/components/ToggleRefinement.svelte";
  import algoliasearch from "algoliasearch/lite";

  const searchClient = algoliasearch("latency", "6be0576ff61c053d5f9a3225e2a90f76");
</script>

<InstantSearch indexName="instant_search" {searchClient}>
  <div class="Container">
    <div>
      <ClearRefinements />
      <RefinementList attribute="brand" />
      <ToggleRefinement attribute="free_shipping" />
    </div>

    <div class="Search">
      <SearchBox />

      <div class="Search-header">
        <PoweredBy />
        <HitsPerPage
          defaultRefinement={20}
          items={[
            { label: "20 hits per page", value: 20 },
            { label: "40 hits per page", value: 40 },
          ]}
        />
      </div>

      <Hits let:hit>
        <span class="Hit-label">{hit.name}</span>
        <span class="Hit-price">${hit.price}</span>
      </Hits>

      <Pagination />
    </div>
  </div>
</InstantSearch>
