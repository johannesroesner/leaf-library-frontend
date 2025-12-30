import {
  BiomeArray,
  type Collection,
  type Plant,
  PlantTypeArray
} from "$lib/types/leaf-library-types";
import type { FilterType } from "$lib/types/frontend-specific-types";

export const pageTitle = $state("Leaf Library");

export const currentUser = $state({
  token: "",
  id: "",
  email: "",
  name: "",
  role: "",
  imageUrl: "",
  aboutMe: ""
});

export const currentPlantFilter = $state({
  value: "all" as FilterType
});

export const currentPlants = $state({
  plants: [] as Plant[],

  plantsTypeTree: [] as Plant[],
  plantsTypeFlower: [] as Plant[],
  plantsTypeFern: [] as Plant[],
  plantsTypeMoss: [] as Plant[],
  plantsTypeGrass: [] as Plant[],
  plantsTypeAquaticPlant: [] as Plant[],
  plantsTypeClimber: [] as Plant[],
  plantsTypeOther: [] as Plant[],

  get filteredList() {
    const filter = currentPlantFilter.value;
    if (filter === "all") return this.plants;
    const mapping: Record<string, Plant[]> = {
      Tree: this.plantsTypeTree,
      Flower: this.plantsTypeFlower,
      Fern: this.plantsTypeFern,
      Moss: this.plantsTypeMoss,
      Grass: this.plantsTypeGrass,
      "Aquatic Plant": this.plantsTypeAquaticPlant,
      Climber: this.plantsTypeClimber,
      Other: this.plantsTypeOther
    };

    return mapping[filter] ?? this.plants;
  },

  plantsBiomeUrban: [] as Plant[],
  plantsBiomeMeadow: [] as Plant[],
  plantsBiomeForest: [] as Plant[],
  plantsBiomePond: [] as Plant[],
  plantsBiomeRiver: [] as Plant[],
  plantsBiomeSea: [] as Plant[],
  plantsBiomeDesert: [] as Plant[],
  plantsBiomeOther: [] as Plant[],

  get distributionPlantTypesAcrossBiomes() {
    const series = [];

    for (const type of PlantTypeArray) {
      const countsPerBiome = [];

      for (const biome of BiomeArray) {
        const count = this.plants.filter(
          (plant) => plant.type === type && plant.biome === biome
        ).length;
        countsPerBiome.push(count);
      }

      const cleanedData = countsPerBiome.some((c) => c > 0);

      if (cleanedData) {
        series.push({
          name: type,
          type: "bar",
          stack: "x",
          emphasis: { focus: "series" },
          data: countsPerBiome
        });
      }
    }
    return series;
  },

  get distributionPlantBiomes() {
    return [
      {
        name: "Count",
        type: "bar",
        data: [
          { value: currentPlants.plantsBiomeDesert.length, name: "Desert" },
          { value: currentPlants.plantsBiomeForest.length, name: "Forest" },
          { value: currentPlants.plantsBiomeMeadow.length, name: "Meadow" },
          { value: currentPlants.plantsBiomeRiver.length, name: "River" },
          { value: currentPlants.plantsBiomePond.length, name: "Pond" },
          { value: currentPlants.plantsBiomeSea.length, name: "Sea" },
          { value: currentPlants.plantsBiomeUrban.length, name: "Urban" },
          { value: currentPlants.plantsBiomeOther.length, name: "Other" }
        ].filter((item) => item.value > 0),
        label: {
          show: true,
          position: "top",
          color: "#fff"
        }
      }
    ];
  },

  get distributionPlantTypes() {
    return [
      {
        name: "Plant Types",
        type: "pie",
        radius: ["45%", "75%"],
        data: [
          { value: currentPlants.plantsTypeTree.length, name: "Trees" },
          { value: currentPlants.plantsTypeFlower.length, name: "Flowers" },
          { value: currentPlants.plantsTypeFern.length, name: "Ferns" },
          { value: currentPlants.plantsTypeMoss.length, name: "Moss" },
          { value: currentPlants.plantsTypeAquaticPlant.length, name: "Aquatic Plants" },
          { value: currentPlants.plantsTypeGrass.length, name: "Grass" },
          { value: currentPlants.plantsTypeClimber.length, name: "Climbers" },
          { value: currentPlants.plantsTypeOther.length, name: "Other" }
        ].filter((item) => item.value > 0),
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
    ];
  }
});

export const currentCollections = $state({ collections: [] as Collection[] });
