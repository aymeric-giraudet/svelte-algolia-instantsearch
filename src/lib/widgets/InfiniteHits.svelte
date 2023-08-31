<script lang="ts">
  import { connectInfiniteHits } from "instantsearch.js/es/connectors";
  import type { InfiniteHitsConnectorParams } from "instantsearch.js/es/connectors/infinite-hits/connectInfiniteHits";

  import connect from "$lib/connect";
  import { cx } from "$lib/utils";

  type InfiniteHitsClasses = {
    /**
     * Class names to apply to the root element
     */
    root: string;
    /**
     * Class names to apply to the root element without results
     */
    emptyRoot: string;
    /**
     * Class names to apply to the "load previous" button
     */
    loadPrevious: string;
    /**
     * Class names to apply to the "load previous" button when it's disabled
     */
    disabledLoadPrevious: string;
    /**
     * Class names to apply to the "load more" button
     */
    loadMore: string;
    /**
     * Class names to apply to the "load more" button when it's disabled
     */
    disabledLoadMore: string;
    /**
     * Class names to apply to the list element
     */
    list: string;
    /**
     * Class names to apply to each item element
     */
    item: string;
  };

  type InfiniteHitsTranslations = {
    showPreviousButtonText: string;
    showMoreButtonText: string;
  };

  type $$Props = InfiniteHitsConnectorParams & {
    classes?: Partial<InfiniteHitsClasses>;
    translations?: Partial<InfiniteHitsTranslations>;
  };
  export let cache: $$Props["cache"] = undefined;
  export let escapeHTML: $$Props["escapeHTML"] = undefined;
  export let showPrevious: $$Props["showPrevious"] = undefined;
  export let transformItems: $$Props["transformItems"] = undefined;
  export let classes: NonNullable<$$Props["classes"]> = {};
  export let translations = {};

  let labels: InfiniteHitsTranslations = {
    showMoreButtonText: "Show more results",
    showPreviousButtonText: "Show previous results",
    ...translations,
  };

  const state = connect(
    connectInfiniteHits,
    {
      cache,
      escapeHTML,
      showPrevious,
      transformItems,
    },
    { $$widgetType: "svelte-ais.infiniteHits" },
  );
  $: ({
    hits,
    showPrevious: onShowPrevious,
    showMore: onShowMore,
    isFirstPage,
    isLastPage,
    sendEvent,
  } = $state);
</script>

<div
  class={cx(
    "ais-InfiniteHits",
    classes.root,
    hits.length === 0 && cx("ais-InfiniteHits--empty", classes.emptyRoot),
  )}
>
  {#if showPrevious}
    <button
      class={cx(
        "ais-InfiniteHits-loadPrevious",
        classes.loadPrevious,
        isFirstPage && cx("ais-InfiniteHits-loadPrevious--disabled", classes.disabledLoadPrevious),
      )}
      on:click={onShowPrevious}
      disabled={isFirstPage}
    >
      {labels.showPreviousButtonText}
    </button>
  {/if}
  <ol class={cx("ais-InfiniteHits-list", classes.list)}>
    {#each hits as hit}
      <li class={cx("ais-InfiniteHits-item", classes.item)}>
        <slot {hit} {sendEvent}>
          <div style="word-break: break-all;">{JSON.stringify(hit).slice(0, 100)} /></div></slot
        >
      </li>
    {/each}
  </ol>
  <button
    class={cx(
      "ais-InfiniteHits-loadMore",
      classes.loadMore,
      isLastPage && cx("ais-InfiniteHits-loadMore--disabled", classes.disabledLoadMore),
    )}
    on:click={onShowMore}
    disabled={isLastPage}
  >
    {labels.showMoreButtonText}
  </button>
</div>
