<script lang="ts">
  import { page } from "$app/state";
  import { currentPlants } from "$lib/runes.svelte.js";
  import Toast from "$lib/ui/Toast.svelte";
  import PlantInfo from "$lib/ui/PlantInfo.svelte";
  import PlantImageCarousel from "$lib/ui/PlantImageCarousel.svelte";
  import PlantForm from "./PlantForm.svelte";
  import Toolbar from "$lib/ui/Toolbar.svelte";
  import { util } from "$lib/services/leaf-library-utils";
  import DetailMap from "$lib/ui/DetailMap.svelte";
  import type { Plant } from "$lib/types/leaf-library-types";

  type Props = {
    data: {
      plants: Plant[];
    };
  };

  let { data }: Props = $props();
  util.updateData(data.plants, []);

  let plant = $state(currentPlants.plants.find((p) => p._id === page.params.plantId));
  let updateStatus = $state(false);

  function plantUpdated(updatedPlant: Plant) {
    data.plants.push(updatedPlant);
    util.updateData(data.plants, []);
    plant = updatedPlant;
    updateStatus = false;
  }
</script>

{#if plant}
  <Toolbar bind:updateStatus deleteAction="?/deletePlant" />
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
    <div class="flex flex-col gap-4 lg:col-span-1">
      <DetailMap latitude={plant.latitude} longitude={plant.longitude} mapType="default" />
      <DetailMap latitude={plant.latitude} longitude={plant.longitude} mapType="topography" />
    </div>

    <div class="lg:col-span-1">
      <PlantInfo {plant} />
    </div>

    <div class="lg:col-span-1">
      <PlantImageCarousel {plant} />
    </div>
  </div>
  {#if updateStatus}
    <PlantForm bind:plant updateEvent={plantUpdated} />
  {/if}
{:else}
  <p class="text-5xl">Server error.</p>
  <Toast text="Server error." type="error" />
{/if}
