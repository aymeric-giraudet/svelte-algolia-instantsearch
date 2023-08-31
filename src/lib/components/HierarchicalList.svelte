<script lang="ts">
  import { cx } from "$lib/utils";
  import type { HierarchicalMenuClassNames } from "$lib/widgets/HierarchicalMenu.svelte";
  import type { HierarchicalMenuRenderState } from "instantsearch.js/es/connectors/hierarchical-menu/connectHierarchicalMenu";

  type HierarchicalListClassNames = Omit<
    HierarchicalMenuClassNames,
    "root" | "noRefinementRoot" | "showMore" | "disabledShowMore"
  >;

  export let classes: Partial<HierarchicalListClassNames> = {};
  export let items: HierarchicalMenuRenderState["items"];
  export let refine: HierarchicalMenuRenderState["refine"];
  export let createURL: HierarchicalMenuRenderState["createURL"];
  let className: string = "";
  export { className as class };
</script>

{#if items.length > 0}
  <ul class={cx("ais-HierarchicalMenu-list", classes.list, className)}>
    {#each items as item}
      <li
        class={cx(
          "ais-HierarchicalMenu-item",
          classes.item,
          item.data &&
            item.data.length > 0 &&
            cx("ais-HierarchicalMenu-item--parent", classes.parentItem),
          item.isRefined && cx("ais-HierarchicalMenu-item--selected", classes.selectedItem),
        )}
      >
        <a
          class={cx(
            "ais-HierarchicalMenu-link",
            classes.link,
            item.isRefined && cx("ais-HierarchicalMenu-link--selected", classes.selectedItemLink),
          )}
          href={createURL(item.value)}
          on:click|preventDefault={() => refine(item.value)}
          ><span class={cx("ais-HierarchicalMenu-label", classes.label)}>{item.label}</span><span
            class={cx("ais-HierarchicalMenu-count", classes.count)}>{item.count}</span
          ></a
        >
      </li>
      {#if item.data}
        <svelte:self
          {classes}
          {refine}
          {createURL}
          class={cx("ais-HierarchicalMenu-list--child", classes.childList)}
          items={item.data}
        />
      {/if}
    {/each}
  </ul>
{/if}
