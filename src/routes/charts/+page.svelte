<script>
  import PlantTypeDonutChart from "$lib/ui/PlantTypeDonutChart.svelte";
  import PlantBiomeBarChart from "$lib/ui/PlantBiomeBarChart.svelte";
  import PlantTypesAcrossBiomesStackedBarChart from "$lib/ui/PlantTypesAcrossBiomesStackedBarChart.svelte";
</script>

<div class="flex">
  <PlantTypeDonutChart />
  <PlantBiomeBarChart />
</div>
<div class="mt-20">
  <PlantTypesAcrossBiomesStackedBarChart />
</div>
