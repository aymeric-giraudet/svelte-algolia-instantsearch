<script lang="ts">
  import ShowMoreButton, {
    type ShowMoreButtonTranslations,
  } from "$lib/components/ShowMoreButton.svelte";
  import { connectMenu } from "instantsearch.js/es/connectors";
  import type { MenuConnectorParams } from "instantsearch.js/es/connectors/menu/connectMenu";

  import connect from "$lib/connect";
  import { cx } from "$lib/utils";

  type MenuClasses = {
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
     * Class names to apply to each selected item element
     */
    selectedItem: string;
    /**
     * Class names to apply to each link element
     */
    link: string;
    /**
     * Class names to apply to each label element
     */
    label: string;
    /**
     * Class names to apply to each facet count element
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

  type MenuTranslations = ShowMoreButtonTranslations;

  type $$Props = MenuConnectorParams & {
    classes?: Partial<MenuClasses>;
    translations?: Partial<MenuTranslations>;
  };
  export let attribute: $$Props["attribute"];
  export let limit: $$Props["limit"] = undefined;
  export let showMore: $$Props["showMore"] = undefined;
  export let showMoreLimit: $$Props["showMoreLimit"] = undefined;
  export let sortBy: $$Props["sortBy"] = undefined;
  export let transformItems: $$Props["transformItems"] = undefined;

  export let classes: NonNullable<$$Props["classes"]> = {};
  export let translations = {};

  let labels: MenuTranslations = {
    showMoreButtonText(options) {
      return options.isShowingMore ? "Show less" : "Show more";
    },
    ...translations,
  };

  const state = connect(
    connectMenu,
    {
      attribute,
      limit,
      showMore,
      showMoreLimit,
      sortBy,
      transformItems,
    },
    { $$widgetType: "svelte-ais.Menu" },
  );
  $: ({ canToggleShowMore, isShowingMore, items, refine, createURL, toggleShowMore, canRefine } =
    $state);
</script>

<div
  class={cx(
    "ais-Menu",
    classes.root,
    !canRefine && cx("ais-Menu--noRefinement", classes.noRefinementRoot),
  )}
>
  <ul class={cx("ais-Menu-list", classes.list)}>
    {#each items as item}
      <li
        class={cx(
          "ais-Menu-item",
          classes.item,
          item.isRefined && cx("ais-Menu-item--selected", classes.selectedItem),
        )}
      >
        <a
          class={cx("ais-Menu-link", classes.link)}
          href={createURL(item.value)}
          on:click|preventDefault={() => {
            refine(item.value);
          }}
        >
          <span class={cx("ais-Menu-label", classes.label)}>
            {item.label}
          </span>
          <span class={cx("ais-Menu-count", classes.count)}>
            {item.count}
          </span>
        </a>
      </li>
    {/each}
  </ul>
  {#if showMore}
    <ShowMoreButton
      class={cx(
        "ais-Menu-showMore",
        classes.showMore,
        !canToggleShowMore && cx("ais-Menu-showMore--disabled", classes.disabledShowMore),
      )}
      translations={labels}
      {isShowingMore}
      disabled={!canToggleShowMore}
      onClick={() => {
        toggleShowMore();
      }}
    />
  {/if}
</div>
