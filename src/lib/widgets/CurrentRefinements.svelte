<script lang="ts">
  import { connectCurrentRefinements } from "instantsearch.js/es/connectors";
  import type { CurrentRefinementsConnectorParams } from "instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements";

  import connect from "$lib/connect";
  import { cx } from "$lib/utils";

  type CurrentRefinementsClassNames = {
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
     * Class names to apply to the list element when there are no refinements possible
     */
    noRefinementList: string;
    /**
     * Class names to apply to each refinement
     */
    item: string;
    /**
     * Class names to apply to the label of each refinement
     */
    label: string;
    /**
     * Class names to apply to the container of each refinement's value
     */
    category: string;
    /**
     * Class names to apply to the text element of each refinement's value
     */
    categoryLabel: string;
    /**
     * Class names to apply to the each refinement's delete button
     */
    delete: string;
  };

  type $$Props = CurrentRefinementsConnectorParams & {
    classes?: Partial<CurrentRefinementsClassNames>;
  };
  export let includedAttributes: $$Props["includedAttributes"] = undefined;
  export let excludedAttributes: $$Props["excludedAttributes"] = undefined;
  export let transformItems: $$Props["transformItems"] = undefined;
  export let classes: NonNullable<$$Props["classes"]> = {};

  const state = connect(connectCurrentRefinements, {
    includedAttributes,
    excludedAttributes,
    transformItems,
  });
  $: ({ items, refine, canRefine } = $state);
</script>

<div
  class={cx(
    "ais-CurrentRefinements",
    classes.root,
    !canRefine && cx("ais-CurrentRefinements--noRefinement", classes.noRefinementRoot)
  )}
>
  <ul
    class={cx(
      "ais-CurrentRefinements-list",
      classes.list,
      !canRefine && cx("ais-CurrentRefinements-list--noRefinement", classes.noRefinementList)
    )}
  >
    {#each items as item}
      <li class={cx("ais-CurrentRefinements-item", classes.item)}>
        <span class={cx("ais-CurrentRefinements-label", classes.label)}>
          {item.label}:
        </span>
        {#each item.refinements as refinement}
          <span class={cx("ais-CurrentRefinements-category", classes.category)}>
            <span class={cx("ais-CurrentRefinements-categoryLabel", classes.categoryLabel)}>
              {refinement.label}
            </span>
            <button
              type="button"
              on:click={() => {
                refine(refinement);
              }}
              class={cx("ais-CurrentRefinements-delete", classes.delete)}
            >
              ✕
            </button></span
          >
        {/each}
      </li>
    {/each}
  </ul>
</div>
