<script lang="ts">
  import { leafLibraryService } from "$lib/services/leaf-library-service";
  import { onMount } from "svelte";
  import type { Plant } from "$lib/types/leaf-library-types";
  import PlantCard from "$lib/ui/PlantCard.svelte";

  let plants: Plant[] = [];
  onMount(async () => {
    plants = await leafLibraryService.getAllPlantsForUser();
    console.log(plants);
  });
</script>

<div class="flex flex-wrap gap-6">
  {#each plants as plant (plant._id)}
    <PlantCard
      id={plant._id}
      images={plant.imageUrls}
      commonName={plant.commonName}
      scientificName={plant.scientificName}
      type={plant.type}
      biome={plant.biome}
      note={plant.note}
    />
  {/each}
</div>
