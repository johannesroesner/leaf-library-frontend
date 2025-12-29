import type { Collection, Plant } from "$lib/types/leaf-library-types";
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

export const  currentPlantFilter= $state({
  value: "all" as FilterType,
});

export const currentPlants = $state(
  { plants: [] as Plant[],

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
        "Tree": this.plantsTypeTree,
        "Flower": this.plantsTypeFlower,
        "Fern": this.plantsTypeFern,
        "Moss": this.plantsTypeMoss,
        "Grass": this.plantsTypeGrass,
        "Aquatic Plant": this.plantsTypeAquaticPlant,
        "Climber": this.plantsTypeClimber,
        "Other": this.plantsTypeOther
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
    plantsBiomeOther: [] as Plant[]
  });

export const currentCollections = $state({ collections: [] as Collection[] });
