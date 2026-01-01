import type { PageServerLoad } from "./$types";
import { leafLibraryService } from "$lib/services/leaf-library-service";
import type { Biome, PlantType } from "$lib/types/leaf-library-types";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  if (session) {
    return {
      plants: await leafLibraryService.getAllPlantsForUser(session),
      collections: await leafLibraryService.getAllCollectionsForUser(session)
    };
  }
};

export const actions = {
  createPlant: async ({ request }) => {
    const form = await request.formData();
    const images = form.getAll("images") as unknown as File[];
    let preparedImageUrls: string[] | null = [];
    if (images && images.length > 0 && images[0].size > 0) {
      for (const image of images) {
        const url = await leafLibraryService.uploadImage(image);
        preparedImageUrls!.push(url);
      }
    } else preparedImageUrls = null;
    const newPlant = {
      commonName: form.get("commonName") as string,
      scientificName: form.get("scientificName") as string,
      note: (form.get("note") as string) === "" ? null : (form.get("note") as string),
      latitude: form.get("latitude") as unknown as number,
      longitude: form.get("longitude") as unknown as number,
      type: form.get("plantType") as PlantType,
      biome: form.get("biome") as Biome,
      imageUrls: preparedImageUrls
    };
    const response = await leafLibraryService.createPlantForUser(newPlant);
    if (response.error) {
      return fail(500, { errorMessage: "Server error." });
    } else {
      return {
        success: true,
        successMessage: "Plant successfully created!",
        data: response.data
      };
    }
  }
};
