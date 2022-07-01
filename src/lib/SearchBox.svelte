<script lang="ts">
  import { connectSearchBox } from "instantsearch.js/es/connectors";

  import connect from "./connect";

  const state = connect(connectSearchBox);

  $: stateValue = $state;
</script>

{#if stateValue !== null}
  <form noValidate>
    <input
      type="search"
      value={stateValue.query}
      on:input={(event) => stateValue?.refine(event.currentTarget.value)}
    />
    <button on:click={() => stateValue?.refine("")} type="button"
      >Reset query</button
    >
    {stateValue.isSearchStalled ? "My search is stalled" : ""}
  </form>
{/if}
