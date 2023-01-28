<script lang="ts">
  import { connectHitsPerPage } from "instantsearch.js/es/connectors";
  import type { HitsPerPageConnectorParams } from "instantsearch.js/es/connectors/hits-per-page/connectHitsPerPage";

  import connect from "../connect";
  import { cx } from "./utils";

  type HitsPerPageClasses = {
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

  type $$Props = HitsPerPageConnectorParams & {
    classes?: Partial<HitsPerPageClasses>;
  };

  export let items: $$Props["items"];
  export let transformItems: $$Props["transformItems"] = undefined;
  export let classes: NonNullable<$$Props["classes"]> = {};

  const state = connect(connectHitsPerPage, {
    items,
    transformItems,
  });
  $: ({ items: stateItems } = $state);

  $: currentValue = stateItems.find((item) => item.isRefined)!.value;
</script>

<div class={cx("ais-HitsPerPage", classes.root)}>
  <select
    class={cx("ais-HitsPerPage-select", classes.select)}
    value={currentValue}
    on:change={({ currentTarget: { value } }) => $state.refine(Number(value))}
  >
    {#each stateItems as item}
      <option class={cx("ais-HitsPerPage-option", classes.option)} value={item.value}
        >{item.label}</option
      >
    {/each}
  </select>
</div>
