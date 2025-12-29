import type { Collection, Plant } from "$lib/types/leaf-library-types";

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

export const PlantTypeArray = [
  "Tree",
  "Flower",
  "Fern",
  "Moss",
  "Grass",
  "Aquatic Plant",
  "Climber",
  "Other"
] as const;

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
