<script lang="ts">
  import { onMount } from "svelte";
  import * as echarts from "echarts";
  import { currentPlants } from "$lib/runes.svelte";

  let chartElement: HTMLElement;

  onMount(() => {
    const chart = echarts.init(chartElement);

    const data = [
      { value: currentPlants.plantsBiomeDesert.length, name: "Desert" },
      { value: currentPlants.plantsBiomeForest.length, name: "Forest" },
      { value: currentPlants.plantsBiomeMeadow.length, name: "Meadow" },
      { value: currentPlants.plantsBiomeRiver.length, name: "River" },
      { value: currentPlants.plantsBiomePond.length, name: "Pond" },
      { value: currentPlants.plantsBiomeSea.length, name: "Sea" },
      { value: currentPlants.plantsBiomeUrban.length, name: "Urban" },
      { value: currentPlants.plantsBiomeOther.length, name: "Other" }
    ].filter((item) => item.value > 0);

    const total = currentPlants.plants.length;

    const option = {
      title: {
        text: "Plant Biome Distribution",
        subtext: `Total Plants: ${total}`,
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
        data: data.map((item) => item.name),
        axisLabel: { color: "#fff" }
      },
      yAxis: {
        type: "value",
        minInterval: 1,
        axisLabel: { color: "#fff" }
      },
      series: [
        {
          name: "Count",
          type: "bar",
          data: data.map((item) => item.value),
          itemStyle: {
            color: "#1fb854"
          },
          label: {
            show: true,
            position: "top",
            color: "#fff"
          }
        }
      ]
    };
    chart.setOption(option);
  });
</script>

<div bind:this={chartElement} class="h-[400px] w-full"></div>
