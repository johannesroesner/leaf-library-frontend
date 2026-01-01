import { fail, redirect } from "@sveltejs/kit";
import { leafLibraryService } from "$lib/services/leaf-library-service";
import { util } from "$lib/services/leaf-library-utils";
import type { PageServerLoad } from "./$types";
import type { Biome, PlantType } from "$lib/types/leaf-library-types";

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  if (session) {
    return {
      plants: await leafLibraryService.getAllPlantsForUser(session),
      collections: await leafLibraryService.getAllCollectionsForUser(session)
    };
  }
  return { plants: [], collections: [] };
};

export const actions = {
  delete: async ({ params, locals }) => {
    const session = locals.session;
    if (!session) return fail(401);

    const plantId = params.plantId;
    if (!plantId) return fail(400);

    try {
      const plants = await leafLibraryService.getAllPlantsForUser(session);
      const plant = plants.find((p) => p._id === plantId);
      if (plant) {
        if (plant.imageUrls && plant.imageUrls.length > 0) {
          for (const url of plant.imageUrls) {
            const publicId = util.getPublicIdFromImageUrl(url);
            if (publicId) await leafLibraryService.deleteImage(publicId);
          }
        }
        await leafLibraryService.deletePlant(plant);
      }
    } catch (error) {
      console.error("error deleting plant:", error);
      return fail(500);
    }

    throw redirect(303, "/garden");
  },

  updatePlant: async ({ request, params, locals }) => {
    const session = locals.session;
    if (!session) return fail(401);

    const plantId = params.plantId;
    if (!plantId) return fail(400);

    const plants = await leafLibraryService.getAllPlantsForUser(session);
    const plant = plants.find((p) => p._id === plantId);
    if (!plant) return fail(404);

    let preparedImageUrls = plant.imageUrls ? [...plant.imageUrls] : null;
    const form = await request.formData();
    const images = form.getAll("images") as unknown as File[];
    if (images && images.length > 0 && images[0].size > 0) {
      for (const image of images) {
        const url = await leafLibraryService.uploadImage(image);
        if (!preparedImageUrls) preparedImageUrls = [];
        preparedImageUrls!.push(url);
      }
    }

    const updatedPlant = {
      _id: plant._id,
      commonName: form.get("commonName") as string,
      scientificName: form.get("scientificName") as string,
      note: (form.get("note") as string) === "" ? null : (form.get("note") as string),
      latitude: form.get("latitude") as unknown as number,
      longitude: form.get("longitude") as unknown as number,
      type: form.get("plantType") as PlantType,
      biome: form.get("biome") as Biome,
      imageUrls: preparedImageUrls,
      date: plant.date,
      userId: plant.userId
    };

    const response = await leafLibraryService.updatePlant(updatedPlant);
    if (response.error) {
      return fail(500, { errorMessage: "Server error." });
    } else {
      return {
        success: true,
        successMessage: "Plant successfully updated!",
        data: response.data
      };
    }
  },

  deleteImage: async ({ request, params, locals }) => {
    const session = locals.session;
    if (!session) return fail(401);

    const plantId = params.plantId;
    if (!plantId) return fail(400);

    const plants = await leafLibraryService.getAllPlantsForUser(session);
    const plant = plants.find((p) => p._id === plantId);
    if (!plant) return fail(404);

    const form = await request.formData();
    const url = form.get("url") as string;
    plant.imageUrls = plant.imageUrls?.filter((imageUrl) => imageUrl !== url) || null;

    const response = await leafLibraryService.updatePlant(plant);
    if (response.error) {
      return fail(500, { errorMessage: "Server error." });
    } else {
      await leafLibraryService.deleteImage(util.getPublicIdFromImageUrl(url));
      return {
        success: true,
        successMessage: "Plant successfully updated!",
        data: response.data
      };
    }
  }
};
