<script lang="ts">
  import { connectPagination } from "instantsearch.js/es/connectors";

  import connect from "./connect";

  const state = connect(connectPagination);

  $: stateValue = $state;
</script>

{#if stateValue !== null}
  <div>
    <button
      disabled={stateValue.isFirstPage}
      on:click={() => stateValue?.refine(stateValue.currentRefinement - 1)}
      >&lt;&lt;</button
    >
    {stateValue.currentRefinement + 1}
    <button
      disabled={stateValue.isLastPage}
      on:click={() => stateValue?.refine(stateValue.currentRefinement + 1)}
      >&gt;&gt;</button
    >
  </div>
{/if}
