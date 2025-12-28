import type { Session } from "$lib/types/frontend-specific-types";
import Cookies from "js-cookie";
import { currentCollections, currentPlants, currentUser } from "$lib/runes.svelte";
import { leafLibraryService } from "$lib/services/leaf-library-service";

export const util = {
  async saveSession(session: Session) {
    await this.updateUserRunes(session);
    Cookies.set("leafLibrary", JSON.stringify(session), {
      expires: 7,
      path: "/",
      sameSite: "strict"
    });
  },

  async restoreSession() {
    const data = this.getCookieData();
    if (data) {
      await this.updateUserRunes(data);
    }
  },

  async clearSession() {
    await this.updateUserRunes({ _id: "", role: "", name: "", email: "", token: "" } as Session);
    Cookies.remove("leafLibrary", { path: "/" });
  },

  async updateUserRunes(data: Session) {
    currentUser.id = data._id || "";
    currentUser.role = data.role || "";
    currentUser.name = data.name || "";
    currentUser.email = data.email || "";
    currentUser.token = data.token || "";
    await this.updateData();
  },

  async updateData() {
    if (currentUser.id) {
      currentPlants.plants = await leafLibraryService.getAllPlantsForUser();
      currentCollections.collections = await leafLibraryService.getAllCollectionsForUser();
    }
  },

  getCookieData(): Session | null {
    const cookie = Cookies.get("leafLibrary");
    return cookie ? JSON.parse(cookie) : null;
  },

  getPublicIdFromImageUrl(url: string): string {
    const parts = url.split("/");
    const lastPart = parts.pop();
    if (!lastPart) {
      return "";
    }
    return lastPart.split(".")[0];
  }
};
