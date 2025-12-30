<script lang="ts">
  import { onMount } from "svelte";
  import * as echarts from "echarts";
  import { currentPlants } from "$lib/runes.svelte";

  let chartElement: HTMLElement;

  onMount(() => {
    const chart = echarts.init(chartElement);
    const option = {
      title: [
        {
          text: "Plant Type Distribution",
          subtext: "Current Plants in garden",
          left: "left",
          textStyle: { color: "#fff" }
        },
        {
          text: currentPlants.plants.length.toString(),
          subtext: "Total Plants",
          left: "center",
          top: "center",
          textStyle: {
            fontSize: 32,
            fontWeight: "bold",
            color: "#fff"
          },
          subtextStyle: {
            fontSize: 14,
            color: "#aaa"
          }
        }
      ],
      tooltip: {
        trigger: "item"
      },
      legend: {
        orient: "vertical",
        left: "left",
        top: "bottom",
        textStyle: { color: "#fff" }
      },
      series: currentPlants.distributionPlantTypes
    };
    chart.setOption(option);
  });
</script>

<div bind:this={chartElement} class="h-[400px] w-full"></div>
