<script lang="ts">
  import PlantCard from "$lib/ui/PlantCard.svelte";
  import type { Plant } from "$lib/types/leaf-library-types";
  import type { SubmitFunction } from "@sveltejs/kit";

  interface Props {
    plants: Plant[];
    plantFunctionAction?: string;
    plantFunctionKey?: string;
    handle?: SubmitFunction;
    mapEvent?: (plantId: string) => void;
  }

  let { plants, plantFunctionAction, plantFunctionKey, handle, mapEvent }: Props = $props();
</script>

<div class="p-4">
  <div class="flex flex-col items-center gap-7">
    {#each plants as plant (plant._id)}
      <PlantCard
        id={plant._id}
        images={plant.imageUrls ?? undefined}
        commonName={plant.commonName}
        scientificName={plant.scientificName}
        type={plant.type}
        biome={plant.biome}
        note={plant.note ?? undefined}
        {plantFunctionAction}
        {plantFunctionKey}
        {handle}
        {mapEvent}
      />
    {:else}
      <p class="text-3xl mt-5">No plants found.</p>
    {/each}
  </div>
</div>
