import type { PageServerLoad } from "../../../.svelte-kit/types/src/routes/garden/$types";
import { leafLibraryService } from "$lib/services/leaf-library-service";

export const load: PageServerLoad = async ({ parent }) => {
  const { session } = await parent();
  if (session) {
    return {
      plants: await leafLibraryService.getAllPlantsForUser(session),
      collections: await leafLibraryService.getAllCollectionsForUser(session)
    };
  }
};
