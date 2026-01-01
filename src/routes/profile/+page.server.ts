import { fail } from "@sveltejs/kit";
import { leafLibraryService } from "$lib/services/leaf-library-service";
import type { Role } from "$lib/types/leaf-library-types";
import { util } from "$lib/services/leaf-library-utils";
import { currentUser } from "$lib/runes.svelte";
import { dev } from "$app/environment";

export const actions = {
  updateProfile: async ({ request, cookies, locals }) => {
    const session = locals.session;
    if (!session) return fail(401);

    const form = await request.formData();
    const images = form.getAll("images") as unknown as File[];
    let currentUserImageUrl = session.imageUrl;
    if (images && images.length > 0 && images[0].size > 0) {
      const url = await leafLibraryService.uploadImage(images[0]);
      if (currentUserImageUrl)
        await leafLibraryService.deleteImage(util.getPublicIdFromImageUrl(currentUserImageUrl));
      currentUserImageUrl = url;
    }

    const response = await leafLibraryService.updateProfile({
      _id: currentUser.id,
      firstName: form.get("firstName") as string,
      secondName: form.get("secondName") as string,
      email: form.get("email") as string,
      aboutMe: (form.get("aboutMe") as string) ? (form.get("aboutMe") as string) : null,
      imageUrl: currentUserImageUrl ? currentUserImageUrl : null,
      role: currentUser.role as unknown as Role
    });

    if (response.error) {
      if (response.code === 409) {
        return fail(409, { errorMessage: "E-mail already in use." });
      }
      return fail(500, { errorMessage: "Server error." });
    } else {
      const userJson = JSON.stringify(response.data);
      cookies.set("leafLibrary", userJson, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: !dev,
        maxAge: 60 * 60 * 24 * 7
      });
      return {
        success: true,
        successMessage: "Profile successfully updated!",
        data: response.data
      };
    }
  }
};
