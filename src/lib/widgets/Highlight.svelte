<script lang="ts">
  import type { BaseHit, Hit } from "instantsearch.js";
  import InternalHighlight, {
    type HighlightClassNames,
  } from "$lib/components/InternalHighlight.svelte";

  import { cx } from "$lib/utils";

  export let classes: Partial<HighlightClassNames> = {};
  export let attribute: string;
  export let hit: Hit<BaseHit>;
  export let highlightedTagName: keyof HTMLElementTagNameMap = "mark";
  export let nonHighlightedTagName: keyof HTMLElementTagNameMap = "span";
  export let separator = "";
</script>

<InternalHighlight
  {attribute}
  {highlightedTagName}
  {nonHighlightedTagName}
  {separator}
  classes={{
    root: cx("ais-Highlight", classes.root),
    highlighted: cx("ais-Highlight-highlighted", classes.highlighted),
    nonHighlighted: cx("ais-Highlight-nonHighlighted", classes.nonHighlighted),
    separator: cx("ais-Highlight-separator", classes.separator),
  }}
  result={hit._highlightResult}
/>
