<script lang="ts">
  import type { Plant } from "$lib/types/leaf-library-types";

  let { plant }: { plant: Plant } = $props();
</script>

<div class="flex h-full flex-col">
  <p class="mb-4 text-2xl font-semibold">Images</p>

  {#if plant.imageUrls && plant.imageUrls.length > 0}
    <div class="carousel h-[28rem] carousel-vertical rounded-box bg-neutral shadow-lg">
      {#each plant.imageUrls as url, index (index)}
        <div class="carousel-item h-full w-full">
          <img src={url} alt="{plant.commonName} - Image {index + 1}" class="w-full object-cover" />
        </div>
      {/each}
    </div>
    {#if plant.imageUrls.length > 1}
      <div class="mt-2 flex animate-bounce justify-center text-base-content/60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    {/if}
  {:else}
    <div
      class="flex h-[28rem] flex-col items-center justify-center rounded-box border-2 border-dashed border-base-300 bg-base-200 shadow-inner"
    >
      <p class="text-base-content/50 italic">No images available.</p>
    </div>
  {/if}
</div>
