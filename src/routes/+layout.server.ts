import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import type { Session } from "$lib/types/frontend-specific-types";

export const load: LayoutServerLoad = async ({ url, cookies }) => {
  const cookieStr = cookies.get("leafLibrary") as string;

  let sessionData: Session | null = null;
  if (cookieStr) sessionData = JSON.parse(cookieStr) as Session;

  const publicRoutes = ["/", "/login", "/signup", "/auth/login/github", "/auth/callback/github"];
  const isPublic = publicRoutes.includes(url.pathname);

  if (!isPublic && !sessionData?._id) throw redirect(401, "/login");
  if (isPublic && !sessionData?._id) {
    return {
      checked: false,
      isPublic,
      session: null
    };
  }
  return {
    checked: true,
    isPublic,
    session: sessionData
  };
};
