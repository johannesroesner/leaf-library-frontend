export interface BackendResponse {
  error: boolean;
  code: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface Session {
  success: boolean;
  _id: string;
  email: string;
  name: string;
  token: string;
  role: string;
}
