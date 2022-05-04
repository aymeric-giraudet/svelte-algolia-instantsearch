import type { Connector, WidgetDescription } from "instantsearch.js";
import { onMount, getContext } from "svelte";
import { readable, type Readable } from "svelte/store";

// With some tricky typing voodoo we're able to get proper state type inference when using connect
type ExtractStateType<T extends (...args: any) => any> = Parameters<Parameters<T>[0]>[0] | null;

export default function connect<T extends Connector<WidgetDescription, Record<string, unknown>>>
  (connector: T, widgetParams: Parameters<ReturnType<T>>[0] = {}): Readable<ExtractStateType<T>> {
  const { getSearch } = getContext('algolia');
  const search = getSearch();

  return readable<ExtractStateType<T>>(null, (set) => {
    onMount(() => {
      const widget = connector(set)(widgetParams);
      search.addWidgets([widget]);
  
      return () => {
        search.removeWidgets([widget]);
      }
    })
  })
}
