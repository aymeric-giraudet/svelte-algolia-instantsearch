<script lang="ts">
  import index from "instantsearch.js/es/widgets/index/index";
  import type { IndexWidgetParams } from "instantsearch.js/es/widgets/index/index";

  import { getIndexContext, setIndexContext } from "$lib/indexContext";
  import { onDestroyClientSide } from "$lib/utils";

  type $$Props = IndexWidgetParams;
  export let indexName: $$Props["indexName"];
  export let indexId: $$Props["indexId"] = undefined;

  const parentIndex = getIndexContext();
  const indexWidget = index({ indexName, indexId });
  parentIndex.addWidgets([indexWidget]);

  setIndexContext(indexWidget);

  onDestroyClientSide(() => {
    parentIndex.removeWidgets([indexWidget]);
  });
</script>

<slot />
