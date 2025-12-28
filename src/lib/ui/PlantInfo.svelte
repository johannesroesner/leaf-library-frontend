<script lang="ts">
  import type { Plant } from "$lib/types/leaf-library-types";

  let { plant }: { plant: Plant } = $props();
</script>

<div class="card h-full bg-base-100">
  <div class="card-body">
    <h2 class="card-title">{plant.commonName}</h2>
    <div class="mb-2">
      <p class="text-sm leading-tight italic opacity-70">
        {plant.scientificName}
      </p>
      {#if plant.note}
        <p class="mt-2 text-sm">{plant.note}</p>
      {/if}
    </div>
    <div class="divider my-2"></div>
    <ul class="space-y-3 text-sm">
      <li class="flex justify-between">
        <span class="font-bold">Type:</span>
        <span>{plant.type}</span>
      </li>
      <li class="flex justify-between">
        <span class="font-bold">Biome:</span>
        <span>{plant.biome}</span>
      </li>
      <li class="flex justify-between">
        <span class="font-bold">Date:</span>
        <span>{new Date(plant.date).toLocaleDateString()}</span>
      </li>
      <li class="flex justify-between">
        <span class="font-bold">Coordinates:</span>
        <span class="mt-1 font-mono text-xs opacity-60">
          {plant.latitude.toFixed(4)}, {plant.longitude.toFixed(4)}
        </span>
      </li>
    </ul>
  </div>
</div>
