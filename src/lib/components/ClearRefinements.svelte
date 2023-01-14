<script lang="ts">
  import { connectClearRefinements } from "instantsearch.js/es/connectors";

  import connect from "../connect";

  const state = connect(connectClearRefinements);
  $: ({ canRefine, refine } = $state);
</script>

<div class="ais-ClearRefinements">
  <button class="ais-ClearRefinements-button" disabled={!canRefine} on:click={refine}>
    Clear refinements
  </button>
</div>
