import type { PageServerLoad } from "./$types";
import { leafLibraryService } from "$lib/services/leaf-library-service";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  if (session) {
    return {
      collections: await leafLibraryService.getAllCollectionsForUser(session)
    };
  }
};

export const actions = {
  createCollection: async ({ request }) => {
    const form = await request.formData();
    const images = form.getAll("images") as unknown as File[];
    let preparedImageUrl: string[] | null = [];
    if (images && images.length > 0 && images[0].size > 0) {
      const url = await leafLibraryService.uploadImage(images[0]);
      preparedImageUrl!.push(url);
    } else preparedImageUrl = null;

    const newCollection = {
      name: form.get("name") as string,
      description: form.get("description") as string,
      imageUrl: preparedImageUrl ? preparedImageUrl[0] : null
    };

    const response = await leafLibraryService.createCollectionForUser(newCollection);
    if (response.error) {
      return fail(500, { errorMessage: "Server error." });
    } else {
      return {
        success: true,
        successMessage: "Collection successfully created!",
        data: response.data
      };
    }
  }
};
