import axios from "axios";
import type { NewUser, Plant } from "$lib/types/leaf-library-types";
import type { BackendResponse, LoginPayload, Session } from "$lib/types/frontend-specific-types";
import { util } from "$lib/services/leaf-library-utils";
import { currentUser } from "$lib/runes.svelte";

export const leafLibraryService = {
  baseUrl: "http://localhost:3000",

  async signup(user: NewUser): Promise<BackendResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users`, user);
      return {
        error: false,
        code: response.status
      };
    } catch (error) {
      return {
        error: true,
        code: axios.isAxiosError(error) ? error.response?.status || 500 : 500
      };
    }
  },

  async login(loginPayload: LoginPayload): Promise<BackendResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, loginPayload);
      if (response.status === 201) {
        const loginData = response.data as Session;
        if (loginData.success) {
          util.saveSession(loginData);
          return {
            error: false,
            code: response.status
          };
        }
      }
      return {
        error: true,
        code: response.status
      };
    } catch (error) {
      return {
        error: true,
        code: axios.isAxiosError(error) ? error.response?.status || 500 : 500
      };
    }
  },

  async getAllPlantsForUser(): Promise<Plant[]> {
    axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.token;
    try {
      const response = await axios.get(`${this.baseUrl}/api/users/${currentUser.id}/plants`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw [];
    }
  }
};
