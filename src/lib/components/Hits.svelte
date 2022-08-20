<script lang="ts">
  import connect from "../connect";
  import { connectHits } from "instantsearch.js/es/connectors";

  const state = connect(connectHits);
  $: ({ hits, sendEvent } = $state);
</script>

<div class="ais-Hits">
  <ol class="ais-Hits-list">
    {#each hits as hit}
      <li class="ais-Hits-item">
        {#if $$slots.default}
          <slot {hit} {sendEvent} />
        {:else}
          <div>{JSON.stringify(hit).slice(0, 100)}</div>
        {/if}
      </li>
    {/each}
  </ol>
</div>
