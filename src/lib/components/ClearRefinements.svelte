<script lang="ts">
  import { connectClearRefinements } from "instantsearch.js/es/connectors";
  import type { ClearRefinementsConnectorParams } from "instantsearch.js/es/connectors/clear-refinements/connectClearRefinements";

  import connect from "../connect";
  import { cx } from "./utils/cx";

  type $$Props = ClearRefinementsConnectorParams & {
    classes?: Partial<{ root: string; button: string; disabledButton: string }>;
    translations?: { reset: string };
  };
  export let includedAttributes: $$Props["includedAttributes"] = undefined;
  export let excludedAttributes: $$Props["excludedAttributes"] = undefined;
  export let transformItems: $$Props["transformItems"] = undefined;
  export let translations = {};
  export let classes: NonNullable<$$Props["classes"]> = {};

  const labels = {
    reset: "Clear refinements",
    ...translations,
  };

  const state = connect(connectClearRefinements, {
    includedAttributes,
    excludedAttributes,
    transformItems,
  });
  $: ({ canRefine, refine } = $state);
  $: disabled = !canRefine;
</script>

<div class={cx("ais-ClearRefinements", classes.root)}>
  <button
    class={cx(
      "ais-ClearRefinements-button",
      classes.button,
      disabled && cx("ais-ClearRefinements-button--disabled", classes.disabledButton)
    )}
    {disabled}
    on:click={refine}
  >
    {labels.reset}
  </button>
</div>
