<script lang="ts">
  import PlantList from "$lib/ui/PlantList.svelte";
  import { currentPlants } from "$lib/runes.svelte";
  import PlantForm from "./PlantForm.svelte";
  import GardenMap from "$lib/ui/GardenMap.svelte";
  import type { Plant } from "$lib/types/leaf-library-types";

  let map : GardenMap;

  function plantCreated(plant: Plant) {
    map.refreshAllMarkers();
    map.moveTo(plant.latitude, plant.longitude);
  }

  function hoverPlant(plantId: string) :void {
    const foundPlant = currentPlants.plants.find(plant => plant._id === plantId);
    if (foundPlant) {
      map.moveTo(foundPlant.latitude, foundPlant.longitude);
    }
  }
</script>

<div class="flex h-[600px] w-full flex-row gap-4 overflow-hidden">
  <div class="w-2/3">
   <GardenMap bind:this={map} />
  </div>
  <div class="w-1/3 overflow-y-scroll">
    <PlantList plants={currentPlants.plants} mapEvent={hoverPlant}  />
  </div>
</div>

<div class="mt-7 flex items-center">
  <PlantForm mapEvent={plantCreated}  />
</div>
