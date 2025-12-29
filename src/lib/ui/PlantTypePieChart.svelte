<script lang="ts">
  import { onMount } from "svelte";
  import * as echarts from "echarts";
  import { currentPlants } from "$lib/runes.svelte";

  let chartElement: HTMLElement;

  onMount(() => {
    const chart = echarts.init(chartElement);

    const data = [
      { value: currentPlants.plantsTypeTree.length, name: "Trees" },
      { value: currentPlants.plantsTypeFlower.length, name: "Flowers" },
      { value: currentPlants.plantsTypeFern.length, name: "Ferns" },
      { value: currentPlants.plantsTypeMoss.length, name: "Moss" },
      { value: currentPlants.plantsTypeAquaticPlant.length, name: "Aquatic Plants" },
      { value: currentPlants.plantsTypeGrass.length, name: "Grass" },
      { value: currentPlants.plantsTypeClimber.length, name: "Climbers" },
      { value: currentPlants.plantsTypeOther.length, name: "Other" }
    ].filter((item) => item.value > 0);

    const total = currentPlants.plants.length;

    const option = {
      title: [
        {
          text: "Plant Type Distribution",
          subtext: "Current Plants in garden",
          left: "left",
          textStyle: { color: "#fff" }
        },
        {
          text: total.toString(),
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
      series: [
        {
          name: "Plant Types",
          type: "pie",
          radius: ["45%", "75%"],
          data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0
            }
          },
          label: { color: "#fff" },
          labelLine: {
            lineStyle: { color: "#ffffff" }
          }
        }
      ]
    };
    chart.setOption(option);
  });
</script>

<div bind:this={chartElement} class="h-[400px] w-full"></div>
