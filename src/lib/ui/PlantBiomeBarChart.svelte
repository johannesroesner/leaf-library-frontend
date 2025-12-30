<script lang="ts">
  import { onMount } from "svelte";
  import * as echarts from "echarts";
  import { currentPlants } from "$lib/runes.svelte";
  import { BiomeArray } from "$lib/types/leaf-library-types";

  let chartElement: HTMLElement;

  onMount(() => {
    const chart = echarts.init(chartElement);
    const option = {
      title: {
        text: "Plant Biome Distribution",
        subtext: `Total Plants: ${currentPlants.plants.length}`,
        left: "left",
        textStyle: { color: "#fff" }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: [...BiomeArray],
        axisLabel: { color: "#fff" }
      },
      yAxis: {
        type: "value",
        minInterval: 1,
        axisLabel: { color: "#fff" }
      },
      series: currentPlants.distributionPlantBiomes
    };
    chart.setOption(option);
  });
</script>

<div bind:this={chartElement} class="h-[400px] w-full"></div>
