<script lang="ts">
  import { onMount } from "svelte";
  import * as echarts from "echarts";
  import { currentPlants } from "$lib/runes.svelte";
  import { BiomeArray } from "$lib/types/leaf-library-types";

  let chartElement: HTMLElement;

  onMount(() => {
    const chart = echarts.init(chartElement);
    const option = {
      backgroundColor: "transparent",
      title: {
        text: "Distribution of Plant Types across Biomes",
        left: "center",
        textStyle: {
          color: "#fff"
        }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      legend: {
        bottom: 0,
        textStyle: {
          color: "#ccc"
        }
      },
      xAxis: {
        type: "category",
        data: [...BiomeArray],
        axisLabel: {
          color: "#fff"
        }
      },
      series: currentPlants.distributionPlantTypesAcrossBiomes,
      yAxis: {
        type: "value",
        minInterval: 1,
        axisLabel: {
          color: "#fff"
        },
        splitLine: {
          lineStyle: {
            color: "#444"
          }
        }
      }
    };
    chart.setOption(option);
  });
</script>

<div bind:this={chartElement} class="h-[500px] w-full"></div>
