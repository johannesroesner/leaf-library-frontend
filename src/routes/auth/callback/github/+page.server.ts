import { redirect } from "@sveltejs/kit";
import { leafLibraryService } from "$lib/services/leaf-library-service";
import { dev } from "$app/environment";

export async function load({ url, cookies }) {
  const code = url.searchParams.get("code");

  if (!code) throw redirect(303, "/");

  const response = await leafLibraryService.authenticateViaGithub({ code });
  if (response.error || !response.data) throw redirect(303, "/");

  const userJson = JSON.stringify(response.data);
  cookies.set("leafLibrary", userJson, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: !dev,
    maxAge: 60 * 60 * 24 * 7
  });

  throw redirect(303, "/garden");
}