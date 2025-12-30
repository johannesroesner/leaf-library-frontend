<script lang="ts">
  import { page } from "$app/state";
  import { currentPlants } from "$lib/runes.svelte.js";
  import Toast from "$lib/ui/Toast.svelte";
  import PlantInfo from "$lib/ui/PlantInfo.svelte";
  import PlantImageCarousel from "$lib/ui/PlantImageCarousel.svelte";
  import PlantForm from "./PlantForm.svelte";
  import Toolbar from "$lib/ui/Toolbar.svelte";
  import { leafLibraryService } from "$lib/services/leaf-library-service";
  import { goto } from "$app/navigation";
  import { util } from "$lib/services/leaf-library-utils";
  import DetailMap from "$lib/ui/DetailMap.svelte";

  let plant = $derived(currentPlants.plants.find((p) => p._id === page.params.plantId));

  let updateStatus = $state(false);
  const deleteFunction = async () => {
    if (plant!.imageUrls && plant!.imageUrls.length > 0) {
      for (const url of plant!.imageUrls) {
        await leafLibraryService.deleteImage(util.getPublicIdFromImageUrl(url));
      }
    }
    await leafLibraryService.deletePlant(plant!);
    await goto("/garden");
  };
</script>

{#if plant}
  <Toolbar bind:updateStatus {deleteFunction} />
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
    <PlantForm bind:plant />
  {/if}
{:else}
  <p class="text-5xl">Server error.</p>
  <Toast text="Server error." type="error" />
{/if}
