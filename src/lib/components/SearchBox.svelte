<script lang="ts">
  import { connectSearchBox } from "instantsearch.js/es/connectors";

  import connect from "../connect";

  const state = connect(connectSearchBox);
  $: ({ query, refine, isSearchStalled } = $state);

  let placeholder = "Search";
</script>

<div class="ais-SearchBox">
  <form class="ais-SearchBox-form" noValidate>
    <input
      class="ais-SearchBox-input"
      type="search"
      value={query}
      on:input={(event) => refine(event.currentTarget.value)}
      {placeholder}
    />
    <button
      class="ais-SearchBox-reset"
      on:click={() => refine("")}
      type="reset"
      hidden={query.length === 0 || isSearchStalled}
    >
      <svg
        class="ais-SearchBox-resetIcon"
        viewBox="0 0 20 20"
        width="10"
        height="10"
      >
        <path
          d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"
        />
      </svg>
    </button>
    <span class="ais-SearchBox-loadingIndicator" hidden={!isSearchStalled}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 38 38"
        stroke="#444"
        class="ais-SearchBox-loadingIcon"
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
    </span>
  </form>
</div>
