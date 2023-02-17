<script context="module" lang="ts">
  export type HierarchicalMenuClassNames = {
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
     * Class names to apply to each child list element
     */
    childList: string;
    /**
     * Class names to apply to each item element
     */
    item: string;
    /**
     * Class names to apply to the selected item
     */
    selectedItem: string;
    /**
     * Class names to apply to the parent item of the list
     */
    parentItem: string;
    /**
     * Class names to apply to each link element
     */
    link: string;
    /**
     * Class names to apply to the link of each selected item
     */
    selectedItemLink: string;
    /**
     * Class names to apply to the label of an item element
     */
    label: string;
    /**
     * Class names to apply to the count of an item element
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
</script>

<script lang="ts">
  import ShowMoreButton, {
    type ShowMoreButtonTranslations,
  } from "$lib/components/ShowMoreButton.svelte";
  import { connectHierarchicalMenu } from "instantsearch.js/es/connectors";
  import type { HierarchicalMenuConnectorParams } from "instantsearch.js/es/connectors/hierarchical-menu/connectHierarchicalMenu";

  import connect from "$lib/connect";
  import { cx } from "$lib/utils";
  import HierarchicalList from "$lib/components/HierarchicalList.svelte";

  type HierarchicalMenuTranslations = ShowMoreButtonTranslations;

  type $$Props = HierarchicalMenuConnectorParams & {
    classes?: Partial<HierarchicalMenuClassNames>;
    translations?: Partial<HierarchicalMenuTranslations>;
  };
  export let attributes: $$Props["attributes"];
  export let limit: $$Props["limit"] = undefined;
  export let rootPath: $$Props["rootPath"] = undefined;
  export let separator: $$Props["separator"] = undefined;
  export let showMore: $$Props["showMore"] = undefined;
  export let showMoreLimit: $$Props["showMoreLimit"] = undefined;
  export let showParentLevel: $$Props["showParentLevel"] = undefined;
  export let sortBy: $$Props["sortBy"] = undefined;
  export let transformItems: $$Props["transformItems"] = undefined;

  export let classes: NonNullable<$$Props["classes"]> = {};
  export let translations = {};

  const labels: HierarchicalMenuTranslations = {
    showMoreButtonText(options) {
      return options.isShowingMore ? "Show less" : "Show more";
    },
    ...translations,
  };

  const state = connect(
    connectHierarchicalMenu,
    {
      attributes,
      limit,
      rootPath,
      separator,
      showMore,
      showMoreLimit,
      showParentLevel,
      sortBy,
      transformItems,
    },
    { $$widgetType: "svelte-ais.HierarchicalMenu" }
  );

  $: ({ items, canToggleShowMore, refine, createURL, isShowingMore, canRefine, toggleShowMore } =
    $state);
</script>

<div
  class={cx(
    "ais-HierarchicalMenu",
    classes.root,
    !canRefine && cx("ais-HierarchicalMenu--noRefinement", classes.noRefinementRoot)
  )}
>
  <HierarchicalList {classes} {items} {refine} {createURL} />

  {#if showMore}
    <ShowMoreButton
      class={cx(
        "ais-HierarchicalMenu-showMore",
        classes.showMore,
        !canToggleShowMore &&
          cx("ais-HierarchicalMenu-showMore--disabled", classes.disabledShowMore)
      )}
      disabled={!canToggleShowMore}
      {isShowingMore}
      onClick={toggleShowMore}
      translations={labels}
    />
  {/if}
</div>
