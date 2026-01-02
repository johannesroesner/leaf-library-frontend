import type { PageServerLoad } from "./$types";
import { leafLibraryService } from "$lib/services/leaf-library-service";
import { fail, redirect } from "@sveltejs/kit";
import { util } from "$lib/services/leaf-library-utils";

export const load: PageServerLoad = async ({ parent, params }) => {
  const { session } = await parent();
  const { collectionId } = params;
  if (session) {
    return {
      allPlants: await leafLibraryService.getAllPlantsForUser(session),
      plantsInCollection: await leafLibraryService.getAllPlantsForCollection(collectionId),
      collections: await leafLibraryService.getAllCollectionsForUser(session)
    };
  }
};

export const actions = {
  deleteCollection: async ({ params, locals }) => {
    const session = locals.session;
    if (!session) return fail(401);

    const collectionId = params.collectionId;
    if (!collectionId) return fail(400);

    try {
      const collections = await leafLibraryService.getAllCollectionsForUser(session);
      const collection = collections.find((c) => c._id === collectionId);
      if (collection) {
        if (collection.imageUrl) {
          const publicId = util.getPublicIdFromImageUrl(collection.imageUrl);
          if (publicId) await leafLibraryService.deleteImage(publicId);
        }
        await leafLibraryService.deleteCollection(collection);
      }
    } catch (error) {
      console.error("error deleting collection:", error);
      return fail(500);
    }

    throw redirect(303, "/collections");
  },

  removePlantFromCollection: async ({ request, params }) => {
    const form = await request.formData();
    const plantId = form.get("plantId") as string;
    const { collectionId } = params;

    const response = await leafLibraryService.removePlantFromCollection(collectionId, plantId);
    if (response.error) {
      return fail(500, { errorMessage: "Server error." });
    } else {
      return {
        success: true,
        successMessage: "Collection successfully created!",
        data: response.data
      };
    }
  },

  addPlantToCollection: async ({ request, params }) => {
    const form = await request.formData();
    const plantId = form.get("plantId") as string;
    const { collectionId } = params;

    const response = await leafLibraryService.addPlantToCollection(collectionId, plantId);
    if (response.error) {
      return fail(500, { errorMessage: "Server error." });
    } else {
      return {
        success: true,
        successMessage: "Collection successfully created!",
        data: response.data
      };
    }
  },

  updateCollection: async ({ request, params, locals }) => {
    const session = locals.session;
    if (!session) return fail(401);

    const collectionId = params.collectionId;
    if (!collectionId) return fail(400);

    const collections = await leafLibraryService.getAllCollectionsForUser(session);
    const collection = collections.find((c) => c._id === collectionId);
    if (!collection) return fail(404);

    let preparedImageUrl = collection.imageUrl ? collection.imageUrl : null;
    const form = await request.formData();
    const images = form.getAll("images") as unknown as File[];
    if (images && images.length > 0 && images[0].size > 0) {
      const url = await leafLibraryService.uploadImage(images[0]);
      if (preparedImageUrl)
        await leafLibraryService.deleteImage(util.getPublicIdFromImageUrl(preparedImageUrl));
      preparedImageUrl = url;
    }

    const updatedCollection = {
      _id: collection._id,
      name: form.get("name") as string,
      description: form.get("description") as string,
      imageUrl: preparedImageUrl,
      userId: collection.userId,
      plantIds: collection.plantIds
    };

    const response = await leafLibraryService.updateCollection(updatedCollection);
    if (response.error) {
      return fail(500, { errorMessage: "Server error." });
    } else {
      return {
        success: true,
        successMessage: "Collection successfully updated!",
        data: response.data
      };
    }
  },

  deleteImage: async ({ request, params, locals }) => {
    const session = locals.session;
    if (!session) return fail(401);

    const collectionId = params.collectionId;
    if (!collectionId) return fail(400);

    const collections = await leafLibraryService.getAllCollectionsForUser(session);
    const collection = collections.find((p) => p._id === collectionId);
    if (!collection) return fail(404);

    const form = await request.formData();
    const url = form.get("url") as string;
    collection.imageUrl = null;

    const response = await leafLibraryService.updateCollection(collection);
    if (response.error) {
      return fail(500, { errorMessage: "Server error." });
    } else {
      await leafLibraryService.deleteImage(util.getPublicIdFromImageUrl(url));
      return {
        success: true,
        successMessage: "Collection successfully updated!",
        data: response.data
      };
    }
  }
};
