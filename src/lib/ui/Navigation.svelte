<script>
  import { page } from "$app/state";
  import { currentUser } from "$lib/runes.svelte.js";

  const initials = currentUser.name.split(" ").map(n => n[0]).join("").toUpperCase();
</script>

<div class="navbar bg-base-100 shadow-2xl">
    <div class="flex-1">
      <p class="text-3xl">Leaf Library</p>
    </div>
    <div class="flex items-center">
      <div role="tablist" class="menu tabs-border tabs">
        <a href="/garden" role="tab" class="tab" class:tab-active={page.url.pathname === "/garden"}>
          Garden
        </a>

        <a
          href="/collections"
          role="tab"
          class="tab"
          class:tab-active={page.url.pathname === "/collections"}
        >
          Collections
        </a>

        <a href="/charts" role="tab" class="tab" class:tab-active={page.url.pathname === "/charts"}>
          Charts
        </a>
      </div>
      <div class="avatar h-12 w-12">
        <div class="rounded-full h-full w-full overflow-hidden relative">

          {#if currentUser.imageUrl}
            <img
              src={currentUser.imageUrl}
              alt={currentUser.name}
              class="h-full w-full object-cover"
            />
          {:else}
            <div class="h-full w-full bg-slate-500 flex items-center justify-center text-white font-bold text-sm">
              {initials}
            </div>
          {/if}
        </div>
    </div>
  </div>
</div>
