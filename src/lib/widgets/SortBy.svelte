<script lang="ts">
  import { connectSortBy } from "instantsearch.js/es/connectors";
  import type { SortByConnectorParams } from "instantsearch.js/es/connectors/sort-by/connectSortBy";

  import connect from "$lib/connect";
  import { cx } from "$lib/utils";

  type SortByClasses = {
    /**
     * Class names to apply to the root element
     */
    root: string;
    /**
     * Class names to apply to the select element
     */
    select: string;
    /**
     * Class names to apply to the option element
     */
    option: string;
  };

  type $$Props = SortByConnectorParams & {
    classes?: Partial<SortByClasses>;
  };

  export let items: $$Props["items"];
  export let transformItems: $$Props["transformItems"] = undefined;
  export let classes: NonNullable<$$Props["classes"]> = {};

  const state = connect(
    connectSortBy,
    {
      items,
      transformItems,
    },
    { $$widgetType: "svelte-ais.sortBy" },
  );

  $: ({ currentRefinement, options, refine } = $state);
</script>

<div class={cx("ais-SortBy", classes.root)}>
  <select
    class={cx("ais-SortBy-select", classes.select)}
    on:change={({ currentTarget: { value } }) => refine(value)}
    value={currentRefinement}
  >
    {#each options as option}
      <option class={cx("ais-SortBy-option", classes.option)} value={option.value}>
        {option.label}
      </option>
    {/each}
  </select>
</div>
