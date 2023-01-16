<script lang="ts">
  import { connectToggleRefinement } from "instantsearch.js/es/connectors";
  import type { ToggleRefinementConnectorParams } from "instantsearch.js/es/connectors/toggle-refinement/connectToggleRefinement";

  import connect from "../connect";

  type $$Props = ToggleRefinementConnectorParams;
  export let attribute: $$Props["attribute"];
  export let on: $$Props["on"] = undefined;
  export let off: $$Props["off"] = undefined;

  const state = connect(connectToggleRefinement, { attribute, on, off });
  $: ({ refine, value } = $state);
</script>

<div class="ais-ToggleRefinement">
  <label class="ais-ToggleRefinement-label">
    <input
      class="ais-ToggleRefinement-checkbox"
      type="checkbox"
      checked={value.isRefined}
      on:change={({ currentTarget: { checked } }) => refine({ isRefined: !checked })}
    />

    <span class="ais-ToggleRefinement-labelText">
      {attribute}
    </span>
  </label>
</div>
