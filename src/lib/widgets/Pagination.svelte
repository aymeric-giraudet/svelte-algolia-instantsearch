<script lang="ts">
  import { connectPagination } from "instantsearch.js/es/connectors";
  import type { PaginationConnectorParams } from "instantsearch.js/es/connectors/pagination/connectPagination";

  import connect from "$lib/connect";
  import { cx } from "$lib/utils";
  import PaginationItem from "$lib/components/PaginationItem.svelte";

  type PaginationClasses = {
    /**
     * Class names to apply to the root element
     */
    root: string;
    /**
     * Class names to apply to the root element when there are no refinements possible
     */
    noRefinementRoot: string;
    /**
     * Class names to apply to the list element
     */
    list: string;
    /**
     * Class names to apply to each item element
     */
    item: string;
    /**
     * Class names to apply to the first page element
     */
    firstPageItem: string;
    /**
     * Class names to apply to the previous page element
     */
    previousPageItem: string;
    /**
     * Class names to apply to each page element
     */
    pageItem: string;
    /**
     * Class names to apply to a selected page element
     */
    selectedItem: string;
    /**
     * Class names to apply to a disabled page element
     */
    disabledItem: string;
    /**
     * Class names to apply to the next page element
     */
    nextPageItem: string;
    /**
     * Class names to apply to the last page element
     */
    lastPageItem: string;
    /**
     * Class names to apply to each link element
     */
    link: string;
  };

  type PageItemTextOptions = {
    /**
     * The page number to be displayed.
     */
    currentPage: number;
    /**
     * The total number of pages.
     */
    nbPages: number;
  };

  type PaginationTranslations = {
    /**
     * The label for the first page's button.
     */
    firstPageItemText: string;
    /**
     * The label for the previous page's button.
     */
    previousPageItemText: string;
    /**
     * The label for the next page's button.
     */
    nextPageItemText: string;
    /**
     * The label for the last page's button.
     */
    lastPageItemText: string;
    /**
     * The label for a page's button.
     */
    pageItemText(options: PageItemTextOptions): string;
    /**
     * The accessible label for the first page's button.
     */
    firstPageItemAriaLabel: string;
    /**
     * The accessible label for the previous page's button.
     */
    previousPageItemAriaLabel: string;
    /**
     * The accessible label for the next page's button.
     */
    nextPageItemAriaLabel: string;
    /**
     * The accessible label for the last page's button.
     */
    lastPageItemAriaLabel: string;
    /**
     * The accessible label for a page's button.
     */
    pageItemAriaLabel(options: PageItemTextOptions): string;
  };

  type $$Props = PaginationConnectorParams & {
    classes?: Partial<PaginationClasses>;
    translations?: Partial<PaginationTranslations>;
    showFirst?: boolean;
    showPrevious?: boolean;
    showNext?: boolean;
    showLast?: boolean;
  };
  export let padding: $$Props["padding"] = undefined;
  export let totalPages: $$Props["totalPages"] = undefined;
  export let showFirst = true;
  export let showPrevious = true;
  export let showNext = true;
  export let showLast = true;

  export let translations: $$Props["translations"] = {};
  export let classes: NonNullable<$$Props["classes"]> = {};

  const labels: PaginationTranslations = {
    firstPageItemText: "‹‹",
    previousPageItemText: "‹",
    nextPageItemText: "›",
    lastPageItemText: "››",
    pageItemText: ({ currentPage }) => String(currentPage),
    firstPageItemAriaLabel: "First",
    previousPageItemAriaLabel: "Previous",
    nextPageItemAriaLabel: "Next",
    lastPageItemAriaLabel: "Last",
    pageItemAriaLabel: ({ currentPage }) => `Page ${currentPage}`,
    ...translations,
  };

  const state = connect(
    connectPagination,
    { padding, totalPages },
    { $$widgetType: "svelte-ais.pagination" }
  );
  $: ({ nbPages, pages, currentRefinement, createURL, refine, isFirstPage, isLastPage } = $state);

  const firstPageIndex = 0;
  $: previousPageIndex = currentRefinement - 1;
  $: nextPageIndex = currentRefinement + 1;
  $: lastPageIndex = nbPages - 1;
</script>

<div
  class={cx(
    "ais-Pagination",
    classes.root,
    currentRefinement <= 1 && cx("ais-Pagination--noRefinement", classes.noRefinementRoot)
  )}
>
  <ul class={cx("ais-Pagination-list", classes.list)}>
    {#if showFirst}
      <PaginationItem
        isDisabled={isFirstPage}
        itemClass={cx(
          "ais-Pagination-item--firstPage",
          classes.firstPageItem,
          isFirstPage && classes.disabledItem
        )}
        anchorClass={classes.link}
        ariaLabel={labels.firstPageItemAriaLabel}
        href={createURL(firstPageIndex)}
        onClick={() => refine(firstPageIndex)}>{labels.firstPageItemText}</PaginationItem
      >
    {/if}
    {#if showPrevious}
      <PaginationItem
        isDisabled={isFirstPage}
        itemClass={cx(
          "ais-Pagination-item--previousPage",
          classes.previousPageItem,
          isFirstPage && classes.disabledItem
        )}
        anchorClass={classes.link}
        ariaLabel={labels.previousPageItemAriaLabel}
        href={createURL(previousPageIndex)}
        onClick={() => refine(previousPageIndex)}>{labels.previousPageItemText}</PaginationItem
      >{/if}
    {#each pages as page}
      <PaginationItem
        isDisabled={false}
        itemClass={cx(
          "ais-Pagination-item--page",
          classes.pageItem,
          page === currentRefinement && cx("ais-Pagination-item--selected", classes.selectedItem)
        )}
        anchorClass={classes.link}
        ariaLabel={labels.pageItemAriaLabel({ currentPage: page + 1, nbPages })}
        href={createURL(page)}
        onClick={() => refine(page)}
        >{labels.pageItemText({ currentPage: page + 1, nbPages })}</PaginationItem
      >{/each}
    {#if showNext}
      <PaginationItem
        isDisabled={isLastPage}
        itemClass={cx(
          "ais-Pagination-item--nextPage",
          classes.nextPageItem,
          isLastPage && classes.disabledItem
        )}
        anchorClass={classes.link}
        ariaLabel={labels.nextPageItemAriaLabel}
        href={createURL(nextPageIndex)}
        onClick={() => refine(nextPageIndex)}>{labels.nextPageItemText}</PaginationItem
      >{/if}
    {#if showLast}
      <PaginationItem
        isDisabled={isLastPage}
        itemClass={cx(
          "ais-Pagination-item--lastPage",
          classes.lastPageItem,
          isLastPage && classes.disabledItem
        )}
        anchorClass={classes.link}
        ariaLabel={labels.lastPageItemAriaLabel}
        href={createURL(lastPageIndex)}
        onClick={() => refine(lastPageIndex)}>{labels.lastPageItemText}</PaginationItem
      >{/if}
  </ul>
</div>
