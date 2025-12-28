<script lang="ts">
  import PlantList from "$lib/ui/PlantList.svelte";
  import { currentPlants } from "$lib/runes.svelte";
  import PlantForm from "./PlantForm.svelte";
</script>

<div class="flex h-[600px] w-full flex-row gap-4 overflow-hidden">
  <div class="flex w-2/3 items-center justify-center border-r border-gray-200 bg-slate-100">
    <div class="text-center">
      <p class="font-bold text-slate-400">placeholder map</p>
    </div>
  </div>

  <PlantList plants={currentPlants.plants} />
</div>

<div class="mt-7 flex items-center">
  <PlantForm />
</div>
