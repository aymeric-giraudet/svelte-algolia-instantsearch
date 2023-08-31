<script lang="ts">
  import { connectBreadcrumb } from "instantsearch.js/es/connectors";
  import type { BreadcrumbConnectorParams } from "instantsearch.js/es/connectors/breadcrumb/connectBreadcrumb";

  import connect from "$lib/connect";
  import { cx } from "$lib/utils";

  type Breadcrumbclasses = {
    /**
     * Class names to apply to the root element
     */
    root: string;
    /**
     * Class names to apply to the root element when there are no refinements possible
     */
    noRefinementRoot: string;
    /**
     * Class names to apply to the list element
     */
    list: string;
    /**
     * Class names to apply to each item element
     */
    item: string;
    /**
     * Class names to apply to the selected item
     */
    selectedItem: string;
    /**
     * Class names to apply to the separator between items
     */
    separator: string;
    /**
     * Class names to apply to each link element
     */
    link: string;
  };

  type BreadcrumbTranslations = {
    /**
     * The label of the root element
     */
    rootElementText: string;
  };

  type $$Props = BreadcrumbConnectorParams & {
    classes?: Partial<Breadcrumbclasses>;
    translations?: Partial<BreadcrumbTranslations>;
  };
  export let attributes: $$Props["attributes"];
  export let separator: $$Props["separator"] = ">";
  export let rootPath: $$Props["rootPath"] = undefined;
  export let transformItems: $$Props["transformItems"] = undefined;
  export let translations = {};
  export let classes: NonNullable<$$Props["classes"]> = {};

  const labels = {
    rootElementText: "Home",
    ...translations,
  };

  const state = connect(
    connectBreadcrumb,
    {
      attributes,
      rootPath,
      transformItems,
    },
    { $$widgetType: "svelte-ais.Breadcrumb" },
  );
  $: ({ canRefine, createURL, items, refine } = $state);
</script>

<div
  class={cx(
    "ais-Breadcrumb",
    classes.root,
    !canRefine && cx("ais-Breadcrumb--noRefinement", classes.noRefinementRoot),
  )}
>
  <ul class={cx("ais-Breadcrumb-list", classes.list)}>
    <li
      class={cx(
        "ais-Breadcrumb-item",
        classes.item,
        !canRefine && cx("ais-Breadcrumb-item--selected", classes.selectedItem),
      )}
    >
      <a
        href={createURL(null)}
        on:click|preventDefault={() => refine(null)}
        class={cx("ais-Breadcrumb-link", classes.link)}
      >
        {labels.rootElementText}
      </a>
    </li>

    {#each items as item, index}
      {@const isLast = index === items.length - 1}
      <li
        class={cx(
          "ais-Breadcrumb-item",
          classes.item,
          isLast && cx("ais-Breadcrumb-item--selected", classes.selectedItem),
        )}
      >
        <span aria-hidden="true" class={cx("ais-Breadcrumb-separator", classes.separator)}>
          {separator}
        </span>

        {#if isLast}
          {item.label}
        {:else}
          <a
            class={cx("ais-Breadcrumb-link", classes.link)}
            href={createURL(item.value)}
            on:click|preventDefault={() => refine(item.value)}
          >
            {item.label}
          </a>
        {/if}
      </li>
    {/each}
  </ul>
</div>
