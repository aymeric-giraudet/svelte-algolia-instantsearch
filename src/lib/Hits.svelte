<script lang="ts">
  import connect from "./connect";
  import { connectHits } from "instantsearch.js/es/connectors";

  const state = connect(connectHits);
</script>

<ul>
  {#each $state.hits as hit}
    <li>
      {#if $$slots.item}
        <slot name="item" {hit} />
      {:else}
        <div>{JSON.stringify(hit).slice(0, 100)}</div>
      {/if}
    </li>
  {/each}
</ul>
