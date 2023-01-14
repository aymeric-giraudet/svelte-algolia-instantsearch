<script lang="ts">
  import { connectRefinementList } from "instantsearch.js/es/connectors";

  import connect from "../connect";

  export let attribute;

  const state = connect(connectRefinementList, { attribute });

  $: ({ items, refine } = $state);
</script>

<div class="ais-RefinementList">
  <ul class="ais-RefinementList-list">
    {#each items as item}
      <li class="ais-RefinementList-item" class:ais-RefinementList-item--selected={item.isRefined}>
        <label class="ais-RefinementList-label">
          <input
            checked={item.isRefined}
            class="ais-RefinementList-checkbox"
            type="checkbox"
            value={item.value}
            on:change={() => refine(item.value)}
          />
          <span class="ais-RefinementList-labelText">
            {item.label}
          </span>
          <span class="ais-RefinementList-count">
            {item.count}
          </span>
        </label>
      </li>
    {/each}
  </ul>
</div>
