<script lang="ts">
  import { connectPagination } from "instantsearch.js/es/connectors";

  import connect from "../connect";

  const state = connect(connectPagination);
  $: ({ nbPages, pages, currentRefinement, createURL, refine, isFirstPage, isLastPage } = $state);

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
      <li class="ais-Pagination-item--firstPage" class:ais-Pagination-item--disabled={isFirstPage}>
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
      <li
        class="ais-Pagination-item--previousPage"
        class:ais-Pagination-item--disabled={isFirstPage}
      >
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
    {#each pages as page}
      <li
        class="ais-Pagination-item"
        class:ais-Pagination-item--selected={page === currentRefinement}
      >
        <a
          class="ais-Pagination-link"
          href={createURL(page)}
          on:click={(e) => {
            e.preventDefault();
            refine(page);
          }}
        >
          {page + 1}
        </a>
      </li>{/each}
    {#if showNext}
      <li class="ais-Pagination-item--nextPage" class:ais-Pagination-item--disabled={isLastPage}>
        <a
          class="ais-Pagination-link"
          href={createURL(nextPageIndex)}
          on:click={(e) => {
            e.preventDefault();
            refine(nextPageIndex);
          }}
        >
          &gt;
        </a>
      </li>{/if}
    {#if showLast}
      <li class="ais-Pagination-item--lastPage" class:ais-Pagination-item--disabled={isLastPage}>
        <a
          class="ais-Pagination-link"
          href={createURL(lastPageIndex)}
          on:click={(e) => {
            e.preventDefault();
            refine(lastPageIndex);
          }}
        >
          &gt;&gt;
        </a>
      </li>{/if}
  </ul>
</div>
