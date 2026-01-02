import type { Handle } from "@sveltejs/kit";
import type { Session } from "$lib/types/frontend-specific-types";

export const handle: Handle = async ({ event, resolve }) => {
  const cookieStr = event.cookies.get("leafLibrary");

  if (cookieStr) event.locals.session = JSON.parse(cookieStr) as Session;
  else event.locals.session = null;

  return resolve(event);
};
