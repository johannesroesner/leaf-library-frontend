import { fail, redirect } from "@sveltejs/kit";
import { leafLibraryService } from "$lib/services/leaf-library-service";
import { dev } from "$app/environment";

export const actions = {
  login: async ({ request, cookies }) => {
    const form = await request.formData();
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    if (email === "" || password === "") {
      return fail(400, { message: "Please fill all fields." });
    } else {
      const response = await leafLibraryService.login({ email, password });
      if (!response.error) {
        const userJson = JSON.stringify(response.data);
        cookies.set("leafLibrary", userJson, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: !dev,
          maxAge: 60 * 60 * 24 * 7
        });
        throw redirect(303, "/garden");
      } else return fail(400, { message: "E-mail or password is invalid." });
    }
  }
};
