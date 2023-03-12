<script lang="ts">
  import { connectClearRefinements } from "instantsearch.js/es/connectors";
  import type { ClearRefinementsConnectorParams } from "instantsearch.js/es/connectors/clear-refinements/connectClearRefinements";

  import connect from "$lib/connect";
  import { cx } from "$lib/utils";

  type ClearRefinementsClasses = {
    /**
     * Class names to apply to the root element
     */
    root: string;
    /**
     * Class names to apply to the button
     */
    button: string;
    /**
     * Class names to apply to the button when it's disabled
     */
    disabledButton: string;
  };

  type ClearRefinementsTranslations = {
    /**
     * Label of the button
     */
    resetButtonText: string;
  };

  type $$Props = ClearRefinementsConnectorParams & {
    classes?: Partial<ClearRefinementsClasses>;
    translations?: Partial<ClearRefinementsTranslations>;
  };
  export let includedAttributes: $$Props["includedAttributes"] = undefined;
  export let excludedAttributes: $$Props["excludedAttributes"] = undefined;
  export let transformItems: $$Props["transformItems"] = undefined;
  export let translations = {};
  export let classes: NonNullable<$$Props["classes"]> = {};

  const labels = {
    resetButtonText: "Clear refinements",
    ...translations,
  };

  const state = connect(
    connectClearRefinements,
    {
      includedAttributes,
      excludedAttributes,
      transformItems,
    },
    { $$widgetType: "svelte-ais.ClearRefinements" }
  );
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
    {labels.resetButtonText}
  </button>
</div>
