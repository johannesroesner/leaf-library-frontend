import { leafLibraryService } from "$lib/services/leaf-library-service";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  signUp: async ({ request }) => {
    const form = await request.formData();

    const firstName = form.get("firstName") as string;
    const secondName = form.get("secondName") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const response = await leafLibraryService.signup({
      firstName,
      secondName,
      email,
      password
    });

    if (!response.error) {
      throw redirect(303, "/login");
    } else {
      const message = response.code === 409 ? "E-mail is already taken." : "Server error.";
      return fail(400, { message });
    }
  }
};
