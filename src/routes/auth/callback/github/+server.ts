/*
import { error, redirect, type RequestHandler } from "@sveltejs/kit";
import { leafLibraryService } from "$lib/services/leaf-library-service";
import { util } from "$lib/services/leaf-library-utils";
import { currentUser } from "$lib/runes.svelte";

  export const GET: RequestHandler = async ({ url}) => {
    const code = url.searchParams.get('code');
    if (!code) throw error(400, 'No code');
    const response = await leafLibraryService.authenticateViaGithub({ code});
    if (!response.error) {
      await util.updateData();
      console.log(currentUser)
      throw redirect(302, '/garden');
    }
    throw redirect(302, '/');
  };

 */
