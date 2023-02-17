<script lang="ts">
  import type { BaseHit, Hit } from "instantsearch.js";
  import InternalHighlight, {
    type HighlightClassNames,
  } from "../components/InternalHighlight.svelte";

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
    root: cx("ais-Snippet", classes.root),
    highlighted: cx("ais-Snippet-highlighted", classes.highlighted),
    nonHighlighted: cx("ais-Snippet-nonHighlighted", classes.nonHighlighted),
    separator: cx("ais-Snippet-separator", classes.separator),
  }}
  result={hit._snippetResult}
/>
