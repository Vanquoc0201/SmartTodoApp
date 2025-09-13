export interface UserPayload {
  id: string;
  email: string;
  name?: string;
  createdAt: string; 
}
export interface RegisterResponse {
  message: string;
  user: UserPayload;
}
export interface LoginResponse {
  accessToken: string; 
  user: UserPayload;
}
export interface RegisterCredentials {
  name?: string;
  email: string;
  password: string;
}
export interface LoginCredentials {
  email: string;
  password: string;
}
export interface AuthState {
  user: UserPayload | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}