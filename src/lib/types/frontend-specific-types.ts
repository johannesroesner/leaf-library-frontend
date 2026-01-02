import type { PlantType } from "$lib/types/leaf-library-types";

export interface BackendResponse<T = void> {
  error: boolean;
  code: number;
  data?: T;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface GitHubOAuthRequest {
  code: string;
}

export interface Session {
  success: boolean;
  _id: string;
  email: string;
  name: string;
  token: string;
  role: string;
  imageUrl: string | null;
  aboutMe: string | null;
}

export type FilterType = "all" | PlantType;
