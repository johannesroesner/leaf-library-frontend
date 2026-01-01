import { util } from "$lib/services/leaf-library-utils";

export const load = async ({ cookies }) => {
  cookies.delete("leafLibrary", { path: "/" });
  util.clearSession();
};
