<script lang="ts">
  import { connectPagination } from "instantsearch.js/es/connectors";

  import connect from "../connect";

  const state = connect(connectPagination);
  $: ({ nbPages, currentRefinement, createURL, refine } = $state);

  const firstPageIndex = 0;
  $: previousPageIndex = currentRefinement - 1;
  $: nextPageIndex = currentRefinement + 1;
  $: lastPageIndex = nbPages - 1;

  let showFirst = true;
  let showPrevious = true;
  let showNext = true;
  let showLast = true;
</script>

<div class="ais-Pagination" class:ais-Pagination--noRefinement={currentRefinement <= 1}>
  <ul class="ais-Pagination-list">
    {#if showFirst}
      <li class="ais-Pagination-item--firstPage">
        <a
          class="ais-Pagination-link"
          href={createURL(firstPageIndex)}
          on:click={(e) => {
            e.preventDefault();
            refine(firstPageIndex);
          }}
        >
          &lt;&lt;
        </a>
      </li>{/if}
    {#if showPrevious}
      <li class="ais-Pagination-item--previousPage">
        <a
          class="ais-Pagination-link"
          href={createURL(previousPageIndex)}
          on:click={(e) => {
            e.preventDefault();
            refine(previousPageIndex);
          }}
        >
          &lt;
        </a>
      </li>{/if}
  </ul>
</div>
