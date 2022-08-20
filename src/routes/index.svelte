<script lang="ts">
  import {
    InstantSearch,
    SearchBox,
    Hits,
    Pagination,
    HitsPerPage,
    PoweredBy,
  } from "$lib";
  import algoliasearch from "algoliasearch/lite";

  const searchClient = algoliasearch(
    "latency",
    "6be0576ff61c053d5f9a3225e2a90f76"
  );
</script>

<InstantSearch indexName="instant_search" {searchClient}>
  <div class="Container">
    <div />
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
</InstantSearch>

<style global>
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    padding: 0.5rem;
    max-width: 1000px;
    margin: 0 auto;
  }

  .Container {
    display: grid;
    align-items: flex-start;
    grid-template-columns: minmax(min-content, 200px) 1fr;
    gap: 0.5rem;
  }

  .Search {
    display: grid;
    gap: 0.5rem;
  }

  .Search-header {
    display: grid;
    align-items: flex-start;
    grid-template-columns: 1fr auto auto auto;
    gap: 0.5rem;
  }

  .CurrentRefinements {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5em;
  }

  .Hit-label {
    flex: 1;
    margin-right: 1rem;
  }

  .Hit-price {
    color: lightslategray;
  }
</style>
