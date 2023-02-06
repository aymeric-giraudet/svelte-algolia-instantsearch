<script lang="ts">
  export let header: string;
</script>

<div class="ais-Panel">
  {#if header}<div class="ais-Panel-header">{header}</div>{/if}
  <slot />
</div>
