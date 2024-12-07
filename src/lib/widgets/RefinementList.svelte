<script lang="ts">
  import { connectRefinementList } from "instantsearch.js/es/connectors";
  import type { RefinementListConnectorParams } from "instantsearch.js/es/connectors/refinement-list/connectRefinementList";
  import Highlight from "./Highlight.svelte";

  import connect from "$lib/connect";
  import { cx } from "$lib/utils";
  import ShowMoreButton, {
    type ShowMoreButtonTranslations,
  } from "$lib/components/ShowMoreButton.svelte";

  type RefinementListClassNames = {
    /**
     * Class names to apply to the root element
     */
    root: string;
    /**
     * Class names to apply to the root element when there are no refinements possible
     */
    noRefinementRoot: string;
    /**
     * Class names to apply to the search box wrapper element
     */
    searchBox: string;
    /**
     * Class names to apply to the input element
     */
    input: string;
    /**
     * Class names to apply to the root element
     */
    noResults: string;
    /**
     * Class names to apply to the list element
     */
    list: string;
    /**
     * Class names to apply to each item element
     */
    item: string;
    /**
     * Class names to apply to each selected item element
     */
    selectedItem: string;
    /**
     * Class names to apply to each label element
     */
    label: string;
    /**
     * Class names to apply to each checkbox element
     */
    checkbox: string;
    /**
     * Class names to apply to the text for each label
     */
    labelText: string;
    /**
     * Class names to apply to the facet count of each item
     */
    count: string;
    /**
     * Class names to apply to the "Show more" button
     */
    showMore: string;
    /**
     * Class names to apply to the "Show more" button if it's disabled
     */
    disabledShowMore: string;
  };

  type RefinementListTranslations = ShowMoreButtonTranslations & {
    /**
     * What to display when there are no results.
     */
    noResultsText: string;
    /**
     * The alternative text of the submit button.
     */
    submitButtonTitle: string;
    /**
     * The alternative text of the reset button.
     */
    resetButtonTitle: string;
  };

  type $$Props = RefinementListConnectorParams & {
    classes?: Partial<RefinementListClassNames>;
    translations?: Partial<RefinementListTranslations>;
    searchable?: boolean;
    searchablePlaceholder?: string;
  };
  export let attribute: $$Props["attribute"];
  export let operator: $$Props["operator"] = undefined;
  export let limit: $$Props["limit"] = undefined;
  export let showMore: $$Props["showMore"] = undefined;
  export let showMoreLimit: $$Props["showMoreLimit"] = undefined;
  export let sortBy: $$Props["sortBy"] = undefined;
  export let escapeFacetValues: $$Props["escapeFacetValues"] = undefined;
  export let transformItems: $$Props["transformItems"] = undefined;

  export let searchable = false;
  export let searchablePlaceholder = "";

  export let classes: NonNullable<$$Props["classes"]> = {};
  export let translations: $$Props["translations"] = {};

  const labels: RefinementListTranslations = {
    resetButtonTitle: "Clear the search query",
    submitButtonTitle: "Submit the search query",
    noResultsText: "No results.",
    showMoreButtonText(options) {
      return options.isShowingMore ? "Show less" : "Show more";
    },
    ...translations,
  };

  const state = connect(
    connectRefinementList,
    {
      attribute,
      operator,
      limit,
      showMore,
      showMoreLimit,
      sortBy,
      escapeFacetValues,
      transformItems,
    },
    { $$widgetType: "svelte-ais.refinementList" },
  );

  $: ({
    items,
    refine,
    canRefine,
    canToggleShowMore,
    isFromSearch,
    searchForItems,
    isShowingMore,
    toggleShowMore,
  } = $state);

  let query = "";
  $: itemsHighlighted = items.map(item =>
    Object.assign({}, item, {
      _highlightResult: {
        item: {
          value: item.highlighted,
        },
      },
    })
  );
  $: noResults = searchable && isFromSearch && items.length === 0 && labels.noResultsText;
</script>

<div
  class={cx(
    "ais-RefinementList",
    classes.root,
    !canRefine && cx("ais-RefinementList--noRefinement", classes.noRefinementRoot),
  )}
>
  {#if searchable}
    <div class={cx("ais-RefinementList-searchBox", classes.searchBox)}>
      <div class="ais-SearchBox">
        <form
          class="ais-SearchBox-form"
          noValidate
          action=""
          on:submit={() => {
            if (items.length > 0) {
              refine(items[0].value);
              query = "";
            }
          }}
        >
          <input
            class={cx("ais-SearchBox-input", classes.input)}
            type="search"
            bind:value={query}
            on:input={(event) => searchForItems(event.currentTarget.value)}
            placeholder={searchablePlaceholder}
          />
          <button
            class="ais-SearchBox-reset"
            on:click={() => {
              searchForItems("");
              query = "";
            }}
            type="reset"
            hidden={query.length === 0}
          >
            <svg class="ais-SearchBox-resetIcon" viewBox="0 0 20 20" width="10" height="10">
              <path
                d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  {/if}

  {#if noResults}
    <div class={cx("ais-RefinementList-noResults", classes.noResults)}>
      {noResults}
    </div>
  {:else}
    <ul class={cx("ais-RefinementList-list", classes.list)}>
      {#each itemsHighlighted as item}
        <li
          class={cx(
            "ais-RefinementList-item",
            classes.item,
            item.isRefined && cx("ais-RefinementList-item--selected", classes.selectedItem),
          )}
        >
          <label class={cx("ais-RefinementList-label", classes.label)}>
            <input
              checked={item.isRefined}
              class={cx("ais-RefinementList-checkbox", classes.checkbox)}
              type="checkbox"
              value={item.value}
              on:change={() => {
                refine(item.value);
                query = "";
              }}
            />
            <span class={cx("ais-RefinementList-labelText", classes.labelText)}>
              {#if query.length > 0}
                <Highlight attribute="item" hit={item} />
              {:else}
                {item.label}
              {/if}
            </span>
            <span class={cx("ais-RefinementList-count", classes.count)}>
              {item.count}
            </span>
          </label>
        </li>
      {/each}
    </ul>
  {/if}

  {#if showMore}
    <ShowMoreButton
      class={cx(
        "ais-RefinementList-showMore",
        classes.showMore,
        !canToggleShowMore && cx("ais-RefinementList-showMore--disabled", classes.disabledShowMore),
      )}
      disabled={!canToggleShowMore}
      onClick={() => toggleShowMore()}
      translations={{ showMoreButtonText: labels.showMoreButtonText }}
      {isShowingMore}
    />
  {/if}
</div>
