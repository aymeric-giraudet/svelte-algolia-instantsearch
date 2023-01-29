<script lang="ts">
  import { cx } from "./utils";

  export let isDisabled: boolean;
  export let itemClass: string;
  export let anchorClass: string = "";
  export let ariaLabel: string;
  export let href: string;
  export let onClick: () => void;
</script>

<li class={cx("ais-Pagination-item", isDisabled && "ais-Pagination-item--disabled", itemClass)}>
  {#if isDisabled}
    <span class={cx("ais-Pagination-link", anchorClass)}><slot /></span>
  {:else}
    <a
      class={cx("ais-Pagination-link", anchorClass)}
      aria-label={ariaLabel}
      on:click|preventDefault={onClick}
      {href}><slot /></a
    >
  {/if}
</li>
