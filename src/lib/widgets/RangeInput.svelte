<script lang="ts">
  import { connectRange } from "instantsearch.js/es/connectors";
  import type {
    RangeConnectorParams,
    RangeMax,
    RangeMin,
  } from "instantsearch.js/es/connectors/range/connectRange";

  import connect from "../connect";
  import { cx } from "../utils";

  type RangeInputClassNames = {
    /**
     * Class names to apply to the root element
     */
    root: string;
    /**
     * Class names to apply to the root element when there are no refinements possible
     */
    noRefinementRoot: string;
    /**
     * Class names to apply to the form element
     */
    form: string;
    /**
     * Class names to apply to each label element
     */
    label: string;
    /**
     * Class names to apply to each input element
     */
    input: string;
    /**
     * Class names to apply to the minimum input element
     */
    inputMin: string;
    /**
     * Class names to apply to the maximum input element
     */
    inputMax: string;
    /**
     * Class names to apply to the separator element
     */
    separator: string;
    /**
     * Class names to apply to the submit button
     */
    submit: string;
  };

  type RangeInputTranslations = {
    /**
     * The label of the separator, between the minimum and maximum inputs
     */
    separatorElementText: string;
    /**
     * The label of the submit button
     */
    submitButtonText: string;
  };

  type $$Props = RangeConnectorParams & {
    classes?: Partial<RangeInputClassNames>;
    translations?: Partial<RangeInputTranslations>;
  };
  export let attribute: $$Props["attribute"];
  export let min: $$Props["min"] = undefined;
  export let max: $$Props["max"] = undefined;
  export let precision: $$Props["precision"] = undefined;

  export let classes: NonNullable<$$Props["classes"]> = {};
  export let translations = {};

  const labels = {
    separatorElementText: "to",
    submitButtonText: "Go",
    ...translations,
  };

  const state = connect(connectRange, {
    attribute,
    min,
    max,
    precision,
  });
  $: ({ refine, range, start, canRefine } = $state);
  $: step = 1 / Math.pow(10, precision || 0);

  let from: RangeMin;
  let to: RangeMax;
  let previousValues = start;
  $: if (previousValues !== start) {
    previousValues = start;
    from = start[0] === -Infinity ? undefined : start[0];
    to = start[1] === Infinity ? undefined : start[1];
  }
</script>

<div
  class={cx(
    cx("ais-RangeInput", classes.root),
    !canRefine && cx("ais-RangeInput--noRefinement", classes.noRefinementRoot)
  )}
>
  <form
    class={cx("ais-RangeInput-form", classes.form)}
    on:submit|preventDefault={() => refine([from, to])}
  >
    <label class={cx("ais-RangeInput-label", classes.label)}>
      <input
        class={cx(
          "ais-RangeInput-input",
          classes.input,
          "ais-RangeInput-input--min",
          classes.inputMin
        )}
        type="number"
        placeholder={range.min?.toString()}
        min={range.min}
        max={range.max}
        {step}
        bind:value={from}
      />
    </label>
    <span class={cx("ais-RangeInput-separator", classes.separator)}>
      {labels.separatorElementText}
    </span>
    <label class={cx("ais-RangeInput-label", classes.label)}>
      <input
        class={cx(
          "ais-RangeInput-input",
          classes.input,
          "ais-RangeInput-input--max",
          classes.inputMax
        )}
        type="number"
        placeholder={range.max?.toString()}
        min={range.min}
        max={range.max}
        {step}
        bind:value={to}
      />
    </label>
    <button class={cx("ais-RangeInput-submit", classes.submit)} type="submit">
      {labels.submitButtonText}
    </button>
  </form>
</div>
