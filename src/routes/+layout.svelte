<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.ico";
  import { currentUser, pageTitle } from "$lib/runes.svelte";
  import Navigation from "$lib/ui/Navigation.svelte";
  import { onMount } from "svelte";
  import { util } from "$lib/services/leaf-library-utils";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  let { children } = $props();

  let checked = $state(false);
  const publicRoutes = ["/", "/login", "/signup"];

  onMount(async () => {
    await util.restoreSession();

    const isPublic = publicRoutes.includes(page.url.pathname);

    if (!currentUser.id && !isPublic) goto("/login");
    else checked = true;
  });
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <link rel="icon" href={favicon} />
</svelte:head>

{#if checked && !publicRoutes.includes(page.url.pathname)}
  {#if currentUser.id}
    <Navigation />
  {/if}
  <div class="container mx-auto mt-10 px-4">
    {@render children()}
  </div>
{:else if checked || publicRoutes.includes(page.url.pathname)}
  {@render children()}
{/if}
