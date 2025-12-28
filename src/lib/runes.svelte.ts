import type { Plant } from "$lib/types/leaf-library-types";

export const pageTitle = $state("Leaf Library");

export const currentUser = $state({
  token: "",
  id: "",
  email: "",
  name: "",
  role: ""
});

export const currentPlants = $state({ plants: [] as Plant[] });
