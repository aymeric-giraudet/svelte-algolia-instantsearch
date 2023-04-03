import Page from "./+page.svelte";
import { getServerState } from "$lib";

export const load = () => getServerState(Page);
