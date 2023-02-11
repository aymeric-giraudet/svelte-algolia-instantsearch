<script lang="ts">
  import { connectToggleRefinement } from "instantsearch.js/es/connectors";
  import type { ToggleRefinementConnectorParams } from "instantsearch.js/es/connectors/toggle-refinement/connectToggleRefinement";

  import connect from "../connect";
  import { cx } from "../utils";

  type ToggleRefinementClassNames = {
    /**
     * Class names to apply to the root element
     */
    root: string;
    /**
     * Class names to apply to the label element
     */
    label: string;
    /**
     * Class names to apply to the checkbox element
     */
    checkbox: string;
    /**
     * Class names to apply to the label text
     */
    labelText: string;
  };

  type $$Props = ToggleRefinementConnectorParams & {
    classes?: Partial<ToggleRefinementClassNames>;
    label?: string;
  };
  export let attribute: $$Props["attribute"];
  export let on: $$Props["on"] = undefined;
  export let off: $$Props["off"] = undefined;
  export let label: $$Props["label"] = undefined;

  export let classes: NonNullable<$$Props["classes"]> = {};

  const state = connect(connectToggleRefinement, { attribute, on, off });
  $: ({ refine, value } = $state);

  $: labelToDisplay = label || value.name;
</script>

<div class={cx("ais-ToggleRefinement", classes.root)}>
  <label class={cx("ais-ToggleRefinement-label", classes.label)}>
    <input
      class={cx("ais-ToggleRefinement-checkbox", classes.checkbox)}
      type="checkbox"
      checked={value.isRefined}
      on:change={({ currentTarget: { checked } }) => refine({ isRefined: !checked })}
    />

    <span class={cx("ais-ToggleRefinement-labelText", classes.labelText)}>
      {labelToDisplay}
    </span>
  </label>
</div>
