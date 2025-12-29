<script lang="ts">
  import { PlantTypeArray } from "$lib/types/leaf-library-types";
  import { currentPlantFilter } from "$lib/runes.svelte.js";
  import type { FilterType } from "$lib/types/frontend-specific-types";

  function handleFilter(event: Event) {
    const target = event.target as HTMLSelectElement;
    currentPlantFilter.value = target.value as FilterType;
  }
</script>

<div class="mb-4 flex items-center gap-3">
  <span class="text-sm font-bold opacity-70">Filter Plants:</span>
  <select
    class="select select-bordered select-sm w-full max-w-xs"
    onchange={handleFilter}
  >
    <option value="All">Show all</option>
    {#each PlantTypeArray as type (type)}
      <option value={type}>{type}</option>
    {/each}
  </select>
</div>