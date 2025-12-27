import type { Session } from "$lib/types/frontend-specific-types";
import Cookies from "js-cookie";
import { currentUser } from "$lib/runes.svelte";

export const util = {
  saveSession(session: Session) {
    this.updateRunes(session);
    Cookies.set("leafLibrary", JSON.stringify(session), {
      expires: 7,
      path: "/",
      sameSite: "strict"
    });
  },

  restoreSession() {
    const data = this.getCookieData();
    if (data) {
      this.updateRunes(data);
    }
  },

  clearSession() {
    this.updateRunes({ _id: "", role: "", name: "", email: "", token: "" } as Session);
    Cookies.remove("leafLibrary", { path: "/" });
  },

  updateRunes(data: Session) {
    currentUser.id = data._id || "";
    currentUser.role = data.role || "";
    currentUser.name = data.name || "";
    currentUser.email = data.email || "";
    currentUser.token = data.token || "";
  },

  getCookieData(): Session | null {
    const cookie = Cookies.get("leafLibrary");
    return cookie ? JSON.parse(cookie) : null;
  }
};
