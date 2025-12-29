import type { Collection, Plant } from "$lib/types/leaf-library-types";

export const pageTitle = $state("Leaf Library");

export const currentUser = $state({
  token: "",
  id: "",
  email: "",
  name: "",
  role: "",
  imageUrl: "",
});

export const currentPlants = $state({ plants: [] as Plant[] });
export const currentCollections = $state({ collections: [] as Collection[] });
