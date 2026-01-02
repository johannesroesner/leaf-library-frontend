<script lang="ts">
  import PlantTypeDonutChart from "$lib/ui/PlantTypeDonutChart.svelte";
  import PlantBiomeBarChart from "$lib/ui/PlantBiomeBarChart.svelte";
  import PlantTypesAcrossBiomesStackedBarChart from "$lib/ui/PlantTypesAcrossBiomesStackedBarChart.svelte";
  import type { Plant } from "$lib/types/leaf-library-types.js";
  import type { Collection } from "$lib/types/leaf-library-types.js";
  import { util } from "$lib/services/leaf-library-utils.js";
  import { currentPage } from "$lib/runes.svelte";

  currentPage.title = "Charts";

  type Props = {
    data: {
      plants: Plant[];
      collections: Collection[];
    };
  };
  let { data }: Props = $props();
  util.updateData(data.plants, data.collections);
</script>

<div class="flex">
  <PlantTypeDonutChart />
  <PlantBiomeBarChart />
</div>
<div class="mt-20">
  <PlantTypesAcrossBiomesStackedBarChart />
</div>
