import Page from "./+page.svelte";
import { getServerState } from "$lib";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ url }) => getServerState(Page, url);
