<script lang="ts">
  import PlantCard from "$lib/ui/PlantCard.svelte";
  import type { Plant } from "$lib/types/leaf-library-types";
  let { plants, plantFunction, plantFunctionKey, mapEvent} = $props<{
    plants: Plant[];
    plantFunction?: (plantId: string) => Promise<void>;
    plantFunctionKey?: string;
    mapEvent?: (plantId: string) => void;
  }>();
</script>

<div class="p-4">
  <div class="flex flex-col items-center gap-7">
    {#each plants as plant (plant._id)}
      <PlantCard
        id={plant._id}
        images={plant.imageUrls}
        commonName={plant.commonName}
        scientificName={plant.scientificName}
        type={plant.type}
        biome={plant.biome}
        note={plant.note}
        {plantFunction}
        {plantFunctionKey}
        {mapEvent}
      />
    {:else}
      <p class="text-3xl mt-5">No plants found.</p>
    {/each}
  </div>
</div>
