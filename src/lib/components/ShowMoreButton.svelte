<script lang="ts" context="module">
  export type ShowMoreButtonTextOptions = {
    /**
     * Whether the widget is showing more items or not.
     */
    isShowingMore: boolean;
  };

  export type ShowMoreButtonTranslations = {
    /**
     * Alternative text for the "Show more" button.
     */
    showMoreButtonText(options: ShowMoreButtonTextOptions): string;
  };
</script>

<script lang="ts">
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
