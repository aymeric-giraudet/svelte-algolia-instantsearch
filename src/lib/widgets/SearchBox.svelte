<script lang="ts">
  import { connectSearchBox } from "instantsearch.js/es/connectors";
  import type { SearchBoxConnectorParams } from "instantsearch.js/es/connectors/search-box/connectSearchBox";

  import connect from "$lib/connect";
  import { cx } from "$lib/utils";

  type SearchBoxClasses = {
    /**
     * Class names to apply to the root element
     */
    root: string;
    /**
     * Class names to apply to the form element
     */
    form: string;
    /**
     * Class names to apply to the input element
     */
    input: string;
    /**
     * Class names to apply to the submit button
     */
    submit: string;
    /**
     * Class names to apply to the submit button icon
     */
    submitIcon: string;
    /**
     * Class names to apply to the reset button
     */
    reset: string;
    /**
     * Class names to apply to the reset button icon
     */
    resetIcon: string;
    /**
     * Class names to apply to the loading indicator
     */
    loadingIndicator: string;
    /**
     * Class names to apply to the loading indicator icon
     */
    loadingIcon: string;
  };

  type SearchBoxTranslations = {
    /**
     * The alternative text of the submit button.
     */
    submitButtonTitle: string;
    /**
     * The alternative text of the reset button.
     */
    resetButtonTitle: string;
  };

  type $$Props = SearchBoxConnectorParams & {
    placeholder?: string;
    searchAsYouType?: boolean;
    classes?: Partial<SearchBoxClasses>;
    translations?: Partial<SearchBoxTranslations>;
  };
  export let queryHook: $$Props["queryHook"] = undefined;

  export let placeholder = "";
  export let searchAsYouType = true;
  // TODO: add support for handlers

  export let classes: NonNullable<$$Props["classes"]> = {};
  export let translations: $$Props["translations"] = {};

  const labels: SearchBoxTranslations = {
    submitButtonTitle: "Submit",
    resetButtonTitle: "Reset",
    ...translations,
  };

  const state = connect(
    connectSearchBox,
    { queryHook },
    {
      $$widgetType: "svelte-ais.SearchBox",
    }
  );
  $: ({ query, refine, clear, isSearchStalled } = $state);

  let input: HTMLInputElement;

  function onReset() {
    clear();
    input.focus();
  }

  function onSubmit() {
    if (!searchAsYouType) {
      refine(input.value);
    }

    input.blur();
  }
</script>

<div class={cx("ais-SearchBox", classes.root)}>
  <form
    class={cx("ais-SearchBox-form", classes.form)}
    novalidate
    action=""
    on:reset|preventDefault|stopPropagation={onReset}
    on:submit|preventDefault|stopPropagation={onSubmit}
  >
    <input
      bind:this={input}
      class={cx("ais-SearchBox-input", classes.input)}
      type="search"
      value={query}
      on:input={(event) => searchAsYouType && refine(event.currentTarget.value)}
      {placeholder}
    />

    <button
      class={cx("ais-SearchBox-submit", classes.submit)}
      type="submit"
      title={labels.submitButtonTitle}
    >
      {#if $$slots.submitIcon}
        <slot name="submitIcon" />
      {:else}
        <svg
          class={cx("ais-SearchBox-submitIcon", classes.submitIcon)}
          width="10"
          height="10"
          viewBox="0 0 40 40"
        >
          <path
            d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"
          />
        </svg>
      {/if}
    </button>

    <button
      class={cx("ais-SearchBox-reset", classes.reset)}
      type="reset"
      title={labels.resetButtonTitle}
      hidden={query.length === 0 || isSearchStalled}
    >
      {#if $$slots.resetIcon}
        <slot name="resetIcon" />
      {:else}
        <svg
          class={cx("ais-SearchBox-resetIcon", classes.resetIcon)}
          viewBox="0 0 20 20"
          width="10"
          height="10"
        >
          <path
            d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"
          />
        </svg>
      {/if}
    </button>

    <span
      class={cx("ais-SearchBox-loadingIndicator", classes.loadingIndicator)}
      hidden={!isSearchStalled}
    >
      {#if $$slots.loadingIcon}
        <slot name="loadingIcon" />
      {:else}
        <svg
          width="16"
          height="16"
          viewBox="0 0 38 38"
          stroke="#444"
          class={cx("ais-SearchBox-loadingIcon", classes.loadingIcon)}
        >
          <g fill="none" fill-rule="evenodd">
            <g transform="translate(1 1)" stroke-width="2">
              <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>
      {/if}
    </span>
  </form>
</div>
