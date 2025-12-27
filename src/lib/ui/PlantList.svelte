<script lang="ts">
  import PlantCard from "$lib/ui/PlantCard.svelte";
  let { plants } = $props();
</script>

<div class="w-1/3 overflow-y-auto p-4">
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
      />
    {:else}
      <p class="text-gray-500 italic">Keine Pflanzen gefunden.</p>
    {/each}
  </div>
</div>
