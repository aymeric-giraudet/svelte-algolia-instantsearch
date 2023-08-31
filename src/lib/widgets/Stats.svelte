<script lang="ts" context="module">
  export type StatsTranslationOptions = {
    nbHits: number;
    processingTimeMS: number;
    nbSortedHits?: number;
    areHitsSorted?: boolean;
  };
</script>

<script lang="ts">
  import { connectStats } from "instantsearch.js/es/connectors";
  import type { StatsConnectorParams } from "instantsearch.js/es/connectors/stats/connectStats";

  import connect from "$lib/connect";
  import { cx } from "$lib/utils";

  type StatsClasses = {
    /**
     * Class names to apply to the root element
     */
    root: string;
  };

  type StatsTranslations = {
    /**
     * Alternative text for the root element text.
     */
    rootElementText(options: StatsTranslationOptions): string;
  };

  const state = connect(connectStats, undefined, { $$widgetType: "svelte-ais.stats" });

  $: ({ nbHits, processingTimeMS, nbSortedHits, areHitsSorted } = $state);

  $: translationOptions = {
    nbHits,
    processingTimeMS,
    nbSortedHits,
    areHitsSorted,
  };

  type $$Props = StatsConnectorParams & {
    classes?: Partial<StatsClasses>;
    translations?: Partial<StatsTranslations>;
  };

  export let classes: NonNullable<$$Props["classes"]> = {};
  export let translations = {};

  const labels = {
    rootElementText(options: StatsTranslationOptions) {
      return options.areHitsSorted
        ? `${options.nbSortedHits!.toLocaleString()} relevant results sorted out of ${options.nbHits.toLocaleString()} found in ${options.processingTimeMS.toLocaleString()}ms`
        : `${options.nbHits.toLocaleString()} results found in ${options.processingTimeMS.toLocaleString()}ms`;
    },
    ...translations,
  };
</script>

<div class={cx("ais-Stats", classes.root)}>
  <span class="ais-Stats-text">
    {labels.rootElementText(translationOptions)}
  </span>
</div>
