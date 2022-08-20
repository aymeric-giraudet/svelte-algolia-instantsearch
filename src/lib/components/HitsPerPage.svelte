<script lang="ts">
  import { connectHitsPerPage } from "instantsearch.js/es/connectors";

  import connect from "../connect";

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
  // TODO: other state values are typed as any for some reason ?
  $: ({ items } = $state);

  let currentValue = defaultRefinement;
</script>

<div class="ais-HitsPerPage">
  <select
    class="ais-HitsPerPage-select"
    bind:value={currentValue}
    on:change={() => $state.refine(currentValue)}
  >
    {#each items as item}
      <option class="ais-HitsPerPage-option" value={item.value}
        >{item.label}</option
      >
    {/each}
  </select>
</div>
