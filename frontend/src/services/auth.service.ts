import { MODULEAUTH, MODULEUSER } from '@/constant/app.constant';
import axiosClient from './axiosClient';
import { RegisterCredentials, LoginCredentials, UserPayload } from '@/types/auth';
const AUTH_MODULE_PATH = MODULEAUTH;
interface BackendLoginResponse {
  status: string;
  code: number;
  data: {
    accessToken: string;
    refreshToken: string; 
    user: UserPayload;
  };
  doc: string;
}

interface BackendRegisterResponse {
  status: string;
  code: number;
  data: {
    user: UserPayload; 
  };
  doc: string;
}

export const authService = {
  async register(credentials: RegisterCredentials): Promise<BackendRegisterResponse['data']> {
    const response = await axiosClient.post<BackendRegisterResponse>(`${AUTH_MODULE_PATH}/Register`, credentials);
    return response.data.data; 
  },

  async login(credentials: LoginCredentials): Promise<BackendLoginResponse['data']> {
    const response = await axiosClient.post<BackendLoginResponse>(`${AUTH_MODULE_PATH}/Login`, credentials);
    return response.data.data; 
  },

  async getMe(): Promise<UserPayload> {
    const response = await axiosClient.get<UserPayload>(`${AUTH_MODULE_PATH}/GetUserInfoWhenLogin`);
    return response.data; 
  },
};