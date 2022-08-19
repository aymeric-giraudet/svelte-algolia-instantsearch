<script lang="ts">
  import { connectPagination } from "instantsearch.js/es/connectors";

  import connect from "./connect";

  const state = connect(connectPagination);
</script>

<div>
  <button
    disabled={$state.isFirstPage}
    on:click={() => $state.refine($state.currentRefinement - 1)}
    >&lt;&lt;</button
  >
  {$state.currentRefinement + 1}
  <button
    disabled={$state.isLastPage}
    on:click={() => $state.refine($state.currentRefinement + 1)}
    >&gt;&gt;</button
  >
</div>
