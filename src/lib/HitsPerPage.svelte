<script lang="ts">
  import { connectHitsPerPage } from "instantsearch.js/es/connectors";

  import connect from "./connect";

  export let defaultRefinement = 10;
  export let items = [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "20", value: 20 },
  ];

  const state = connect(connectHitsPerPage, {
    items: items.map((item) =>
      item.value === defaultRefinement ? { ...item, default: true } : item
    ),
  });

  let currentValue = defaultRefinement;

  $: stateValue = $state;
</script>

{#if stateValue !== null}
  <select
    bind:value={currentValue}
    on:change={() => stateValue?.refine(currentValue)}
  >
    {#each stateValue.items as item}
      <option value={item.value}>{item.label}</option>
    {/each}
  </select>
{/if}
