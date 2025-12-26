import { redirect } from "@sveltejs/kit";
import type { Handle } from "@sveltejs/kit";
import { currentUser } from "$lib/runes.svelte";

const publicRoutes = ["/", "/login", "/signup"];

export const handle: Handle = async ({ event, resolve }) => {
  const { pathname } = event.url;

  const isPublicRoute = publicRoutes.includes(pathname);

  if (!currentUser.id && !isPublicRoute) {
    throw redirect(302, "/login");
  }

  return resolve(event);
};
