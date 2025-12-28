<script lang="ts">
  import { page } from "$app/state";
  import { currentPlants } from "$lib/runes.svelte.js";
  import MapDummy from "$lib/ui/MapDummy.svelte";
  import Toast from "$lib/ui/Toast.svelte";
  import PlantInfo from "$lib/ui/PlantInfo.svelte";
  import PlantImageCarousel from "$lib/ui/PlantImageCarousel.svelte";

  let plant = $derived(currentPlants.plants.find((p) => p._id === page.params.plantId));
</script>

{#if plant}
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
    <div class="flex flex-col gap-4 lg:col-span-1">
      <MapDummy text="Map1" />
      <MapDummy text="Map2" />
    </div>

    <div class="lg:col-span-1">
      <PlantInfo {plant} />
    </div>

    <div class="lg:col-span-1">
      <PlantImageCarousel {plant} />
    </div>
  </div>
{:else}
  <p class="text-5xl">Server error.</p>
  <Toast text="Server error." type="error" />
{/if}
