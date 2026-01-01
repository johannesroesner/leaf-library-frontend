<script lang="ts">
  import "./layout.css";
  import favicon from "$lib/assets/favicon.ico";
  import { currentUser, pageTitle } from "$lib/runes.svelte";
  import Navigation from "$lib/ui/Navigation.svelte";
  import Footer from "$lib/ui/Footer.svelte";
  import type { Snippet } from "svelte";
  import type { Session } from "$lib/types/frontend-specific-types";
  import { util } from "$lib/services/leaf-library-utils";

  type Props = {
    data: {
      checked: boolean;
      isPublic: boolean;
      session: Session;
    };
    children: Snippet;
  };

  let { data, children }: Props = $props();
  if (data.checked) util.updateUserRunes(data.session);
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col">
  {#if data.isPublic}
    <main class="flex-grow">
      {@render children()}
    </main>
  {:else if data.checked}
    {#if currentUser.id}
      <Navigation />
    {/if}
    <main class="flex-grow">
      <div class="container mx-auto mt-10 px-4">
        {@render children()}
      </div>
    </main>
    <Footer />
  {/if}
</div>
