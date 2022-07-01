<script lang="ts">
  import connect from "./connect";
  import { connectHits } from "instantsearch.js/es/connectors";
  import type { Hit, BaseHit } from "instantsearch.js";

  const state = connect(connectHits);

  type T = $$Generic<Hit>;
  interface $$Slots {
    default: {
      hit: T;
    };
  }
</script>

{#if $state !== null}
  <ul>
    {#each $state.hits as hit}
      <li>
        {#if $$slots.default}
          <slot {hit} />
        {:else}
          <div>{JSON.stringify(hit).slice(0, 100)}</div>
        {/if}
      </li>
    {/each}
  </ul>
{/if}
