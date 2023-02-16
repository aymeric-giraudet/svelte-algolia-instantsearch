import { getServerContext } from "$lib/getServerState";
import { onDestroy } from "svelte";

export function onDestroyClientSide(callback: () => void) {
  const serverContext = getServerContext();

  if (!serverContext) {
    onDestroy(callback);
  }
}
