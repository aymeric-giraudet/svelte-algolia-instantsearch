<script lang="ts">
  import type { ShowMoreButtonTranslations } from "./ShowMoreButton";

  let className: string;
  export { className as class };

  export let disabled: boolean;
  export let translations: ShowMoreButtonTranslations;
  export let isShowingMore: boolean;
  export let onClick: (event: MouseEvent) => void;
</script>

<button class={className} {disabled} on:click={onClick}
  >{translations.showMoreButtonText({ isShowingMore })}</button
>
