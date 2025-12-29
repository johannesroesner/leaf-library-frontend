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
    currentUser.imageUrl = data.imageUrl || "";
    currentUser.aboutMe = data.aboutMe || "";
    await this.updateData();
  },

  async updateData() {
    if (currentUser.id) {
      currentPlants.plants = await leafLibraryService.getAllPlantsForUser();
      currentCollections.collections = await leafLibraryService.getAllCollectionsForUser();

      this.sortPlantTypes();
      this.sortPlantBiomes();
    }
  },

  sortPlantTypes() {
    currentPlants.plantsTypeTree = currentPlants.plants.filter(plant => plant.type === "Tree");
    currentPlants.plantsTypeFern = currentPlants.plants.filter(plant => plant.type === "Fern");
    currentPlants.plantsTypeMoss = currentPlants.plants.filter(plant => plant.type === "Moss");
    currentPlants.plantsTypeGrass = currentPlants.plants.filter(plant => plant.type === "Grass");
    currentPlants.plantsTypeAquaticPlant = currentPlants.plants.filter(plant => plant.type === "Aquatic Plant");
    currentPlants.plantsTypeClimber = currentPlants.plants.filter(plant => plant.type === "Climber");
    currentPlants.plantsTypeOther = currentPlants.plants.filter(plant => plant.type === "Other");
  },

  sortPlantBiomes() {
    currentPlants.plantsBiomeUrban = currentPlants.plants.filter(plant => plant.biome === "Urban");
    currentPlants.plantsBiomeMeadow = currentPlants.plants.filter(plant => plant.biome === "Meadow");
    currentPlants.plantsBiomeForest = currentPlants.plants.filter(plant => plant.biome === "Forest");
    currentPlants.plantsBiomePond = currentPlants.plants.filter(plant => plant.biome === "Pond");
    currentPlants.plantsBiomeRiver = currentPlants.plants.filter(plant => plant.biome === "River");
    currentPlants.plantsBiomeSea = currentPlants.plants.filter(plant => plant.biome === "Sea");
    currentPlants.plantsBiomeDesert = currentPlants.plants.filter(plant => plant.biome === "Desert");
    currentPlants.plantsBiomeOther = currentPlants.plants.filter(plant => plant.biome === "Other");
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
