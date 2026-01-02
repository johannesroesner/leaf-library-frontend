import axios from "axios";
import type {
  Collection,
  NewCollection,
  NewPlant,
  NewUser,
  Plant,
  Profile
} from "$lib/types/leaf-library-types";
import type {
  BackendResponse,
  GitHubOAuthRequest,
  LoginPayload,
  Session
} from "$lib/types/frontend-specific-types";
import { currentUser } from "$lib/runes.svelte";

export const leafLibraryService = {
  baseUrl: "http://localhost:3000",

  async authenticateViaGithub(
    gitHubOAuthRequest: GitHubOAuthRequest
  ): Promise<BackendResponse<Session>> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/auth/github`, gitHubOAuthRequest);
      if (response.status === 201) {
        const loginData = response.data as Session;
        if (loginData.success) {
          return {
            error: false,
            code: response.status,
            data: loginData
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

  async login(loginPayload: LoginPayload): Promise<BackendResponse<Session>> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, loginPayload);
      if (response.status === 201) {
        const loginData = response.data as Session;
        if (loginData.success) {
          return {
            error: false,
            code: response.status,
            data: loginData
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

  async getAllPlantsForUser(session: Session): Promise<Plant[]> {
    axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
    try {
      const response = await axios.get(`${this.baseUrl}/api/users/${session._id}/plants`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw [];
    }
  },

  async createPlantForUser(newPlant: NewPlant): Promise<BackendResponse> {
    axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.token;
    try {
      const response = await axios.post(
        `${this.baseUrl}/api/users/${currentUser.id}/plants`,
        newPlant
      );
      if (response.status === 201) {
        return {
          error: false,
          code: response.status,
          data: response.data
        };
      }
      return {
        error: true,
        code: response.status
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: axios.isAxiosError(error) ? error.response?.status || 500 : 500
      };
    }
  },

  async updatePlant(plant: Plant): Promise<BackendResponse> {
    axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.token;
    try {
      const response = await axios.put(`${this.baseUrl}/api/plants/${plant._id}`, plant);
      if (response.status === 200) {
        return {
          error: false,
          code: response.status,
          data: response.data
        };
      }
      return {
        error: true,
        code: response.status
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: axios.isAxiosError(error) ? error.response?.status || 500 : 500
      };
    }
  },

  async deletePlant(plant: Plant): Promise<BackendResponse> {
    axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.token;
    try {
      const response = await axios.delete(`${this.baseUrl}/api/plants/${plant._id}`);
      if (response.status === 204) {
        return {
          error: false,
          code: response.status
        };
      }
      return {
        error: true,
        code: response.status
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: axios.isAxiosError(error) ? error.response?.status || 500 : 500
      };
    }
  },

  async getAllCollectionsForUser(session: Session): Promise<Collection[]> {
    axios.defaults.headers.common["Authorization"] = "Bearer " + session.token;
    try {
      const response = await axios.get(`${this.baseUrl}/api/users/${session._id}/collections`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw [];
    }
  },

  async getAllPlantsForCollection(collectionId: string): Promise<Plant[]> {
    axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.token;
    try {
      const response = await axios.get(`${this.baseUrl}/api/collections/${collectionId}/plants`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw [];
    }
  },

  async removePlantFromCollection(collectionId: string, plantId: string): Promise<BackendResponse> {
    axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.token;
    try {
      const response = await axios.delete(
        `${this.baseUrl}/api/collections/${collectionId}/deletePlant/${plantId}`
      );
      if (response.status === 204) {
        return {
          error: false,
          code: response.status
        };
      }
      return {
        error: true,
        code: response.status
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: axios.isAxiosError(error) ? error.response?.status || 500 : 500
      };
    }
  },

  async addPlantToCollection(collectionId: string, plantId: string): Promise<BackendResponse> {
    axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.token;
    try {
      const response = await axios.post(
        `${this.baseUrl}/api/collections/${collectionId}/addPlant/${plantId}`
      );
      if (response.status === 201) {
        return {
          error: false,
          code: response.status
        };
      }
      return {
        error: true,
        code: response.status
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: axios.isAxiosError(error) ? error.response?.status || 500 : 500
      };
    }
  },

  async createCollectionForUser(newCollection: NewCollection): Promise<BackendResponse> {
    axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.token;
    try {
      const response = await axios.post(
        `${this.baseUrl}/api/users/${currentUser.id}/collections`,
        newCollection
      );
      if (response.status === 201) {
        return {
          error: false,
          code: response.status,
          data: response.data
        };
      }
      return {
        error: true,
        code: response.status
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: axios.isAxiosError(error) ? error.response?.status || 500 : 500
      };
    }
  },

  async deleteCollection(collection: Collection): Promise<BackendResponse> {
    axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.token;
    try {
      const response = await axios.delete(`${this.baseUrl}/api/collections/${collection._id}`);
      if (response.status === 204) {
        return {
          error: false,
          code: response.status
        };
      }
      return {
        error: true,
        code: response.status
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: axios.isAxiosError(error) ? error.response?.status || 500 : 500
      };
    }
  },

  async updateCollection(collection: Collection): Promise<BackendResponse> {
    axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.token;
    try {
      const response = await axios.put(
        `${this.baseUrl}/api/collections/${collection._id}`,
        collection
      );
      if (response.status === 200) {
        return {
          error: false,
          code: response.status,
          data: response.data
        };
      }
      return {
        error: true,
        code: response.status
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: axios.isAxiosError(error) ? error.response?.status || 500 : 500
      };
    }
  },

  async updateProfile(profile: Profile): Promise<BackendResponse<Session>> {
    axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.token;
    try {
      const response = await axios.put(`${this.baseUrl}/api/users/${profile._id}`, profile);
      const newProfile = response.data as Profile;
      if (response.status === 200) {
        return {
          error: false,
          code: response.status,
          data: {
            success: true,
            token: currentUser.token,
            _id: newProfile._id,
            email: newProfile.email,
            role: newProfile.role,
            name: newProfile.firstName + " " + newProfile.secondName,
            imageUrl: newProfile.imageUrl,
            aboutMe: newProfile.aboutMe
          }
        };
      }
      return {
        error: true,
        code: response.status
      };
    } catch (error) {
      console.log(error);
      return {
        error: true,
        code: axios.isAxiosError(error) ? error.response?.status || 500 : 500
      };
    }
  },

  async uploadImage(image: File): Promise<string> {
    axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.token;
    try {
      const formData = new FormData();
      formData.append("file", image);
      const response = await axios.post(`${this.baseUrl}/api/images`, formData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw "";
    }
  },

  async deleteImage(publicId: string): Promise<void> {
    axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser.token;
    await axios.delete(`${this.baseUrl}/api/images/${publicId}`);
  }
};
