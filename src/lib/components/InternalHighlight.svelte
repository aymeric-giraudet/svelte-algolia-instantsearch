<script lang="ts" context="module">
  export type HighlightClassNames = {
    /**
     * Class names to apply to the root element
     */
    root: string;
    /**
     * Class names to apply to the highlighted parts
     */
    highlighted: string;
    /**
     * Class names to apply to the non-highlighted parts
     */
    nonHighlighted: string;
    /**
     * Class names to apply to the separator between highlighted parts
     */
    separator: string;
  };
</script>

<script lang="ts">
  import type { HitHighlightResult, HitSnippetResult } from "instantsearch.js";
  import { getHighlightedParts, getPropertyByPath, unescape } from "instantsearch.js/es/lib/utils";

  import { cx } from "../utils";

  type HighlightPart = { isHighlighted: boolean; value: string };

  export let classes: HighlightClassNames;

  export let attribute: string;
  export let result: HitHighlightResult | HitSnippetResult | undefined;
  export let highlightedTagName: keyof HTMLElementTagNameMap = "mark";
  export let nonHighlightedTagName: keyof HTMLElementTagNameMap = "span";
  export let separator = "";

  let parts: HighlightPart[][];

  $: {
    const property = getPropertyByPath(result, attribute) || [];
    const properties = Array.isArray(property) ? property : [property];

    parts = properties.map((singleValue) => getHighlightedParts(unescape(singleValue.value || "")));
  }
</script>

<span class={classes.root}>
  {#each parts as part, partIndex}
    {@const isLastPart = partIndex === parts.length - 1}

    {#each part as { isHighlighted, value }}
      {@const tagName = isHighlighted ? highlightedTagName : nonHighlightedTagName}

      <svelte:element
        this={tagName}
        class={cx(isHighlighted && classes.highlighted, !isHighlighted && classes.nonHighlighted)}
        >{value}</svelte:element
      >
    {/each}

    {#if !isLastPart}
      <span class={classes.separator}>
        {separator}
      </span>
    {/if}
  {/each}
</span>
