<script>
  import { page } from "$app/state";
  import { currentUser } from "$lib/runes.svelte.js";

  const initials = currentUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
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
    <div class="dropdown dropdown-end">
      <div tabIndex="0" role="button" class="avatar h-12 w-12 cursor-pointer rounded-full">
        <div class="relative h-full w-full overflow-hidden rounded-full">
          {#if currentUser.imageUrl}
            <img
              src={currentUser.imageUrl}
              alt={currentUser.name}
              class="h-full w-full object-cover"
            />
          {:else}
            <div
              class="flex h-full w-full items-center justify-center bg-secondary text-sm font-bold text-white"
            >
              {initials}
            </div>
          {/if}
        </div>
      </div>

      <ul
        tabIndex="0"
        class="dropdown-content menu z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow-2xl"
      >
        <li><a href="/profile">Profile</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </div>
  </div>
</div>
