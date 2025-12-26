<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.ico";
  import { pageTitle } from "$lib/runes.svelte";
  import { onMount } from "svelte";
  import { util } from "$lib/services/leaf-library-utils";

  let { children } = $props();

  onMount(() => {
    util.restoreSession();
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <link rel="icon" href={favicon} />
</svelte:head>
{@render children()}
