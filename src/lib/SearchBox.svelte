<script lang="ts">
  import { connectSearchBox } from "instantsearch.js/es/connectors";

  import connect from "./connect";

  const state = connect(connectSearchBox);
</script>

<form noValidate>
  <input
    type="search"
    value={$state.query}
    on:input={(event) => $state.refine(event.currentTarget.value)}
  />
  <button on:click={() => $state.refine("")} type="button">Reset query</button>
  {$state.isSearchStalled ? "My search is stalled" : ""}
</form>
