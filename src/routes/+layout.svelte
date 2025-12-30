<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.ico";
  import { currentUser, pageTitle } from "$lib/runes.svelte";
  import Navigation from "$lib/ui/Navigation.svelte";
  import { onMount } from "svelte";
  import { util } from "$lib/services/leaf-library-utils";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import Footer from "$lib/ui/Footer.svelte";

  let { children } = $props();

  let checked = $state(false);
  const publicRoutes = ["/", "/login", "/signup", "/auth/login/github", "/auth/callback/github"];

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

<div class="flex min-h-screen flex-col">
  {#if checked && !publicRoutes.includes(page.url.pathname)}
    {#if currentUser.id}
      <Navigation />
    {/if}
    <main class="flex-grow">
      <div class="container mx-auto mt-10 px-4">
        {@render children()}
      </div>
    </main>
    <Footer />
  {:else if checked || publicRoutes.includes(page.url.pathname)}
    <main class="flex-grow">
      {@render children()}
    </main>
  {/if}
</div>
