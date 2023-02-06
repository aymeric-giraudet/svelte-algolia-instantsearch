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
    ToggleRefinement,
    SortBy,
  } from "$lib";
  import algoliasearch from "algoliasearch/lite";

  import Panel from "./Panel.svelte";

  const searchClient = algoliasearch("latency", "6be0576ff61c053d5f9a3225e2a90f76");
</script>

<InstantSearch indexName="instant_search" {searchClient}>
  <div class="Container">
    <div>
      <Panel header="Brands"
        ><RefinementList
          attribute="brand"
          searchable
          searchablePlaceholder="Search brands"
          showMore
        /></Panel
      >
      <Panel header="Free Shipping">
        <ToggleRefinement attribute="free_shipping" label="Free shipping" />
      </Panel>
    </div>

    <div class="Search">
      <SearchBox />

      <div class="Search-header">
        <PoweredBy />
        <HitsPerPage
          items={[
            { label: "20 hits per page", value: 20, default: true },
            { label: "40 hits per page", value: 40 },
          ]}
        />
        <SortBy
          items={[
            { label: "Relevance", value: "instant_search" },
            { label: "Price (asc)", value: "instant_search_price_asc" },
            { label: "Price (desc)", value: "instant_search_price_desc" },
          ]}
        />
      </div>

      <div class="CurrentRefinements">
        <ClearRefinements translations={{ resetButtonText: "Clear filters" }} />
      </div>

      <Hits let:hit>
        <span class="Hit-label">{hit.name}</span>
        <span class="Hit-price">${hit.price}</span>
      </Hits>

      <Pagination />
    </div>
  </div>
</InstantSearch>
