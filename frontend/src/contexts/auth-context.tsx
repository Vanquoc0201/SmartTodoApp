'use client';
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { authService } from '@/services/auth.service';
import { authStorage } from '@/lib/auth';
import { AuthState, LoginCredentials, RegisterCredentials, UserPayload } from '@/types/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isLoading: true,
    error: null,
    isLoggedIn: false,
  });

  const loadUser = useCallback(async () => {
    const token = authStorage.getAccessToken();
    if (!token) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      const user = await authService.getMe();
      setAuthState({
        user,
        accessToken: token,
        isLoading: false,
        error: null,
        isLoggedIn: true,
      });
    } catch (error: any) {
      console.error('Error loading user:', error);
      authStorage.removeAccessToken();
      setAuthState({
        user: null,
        accessToken: null,
        isLoading: false,
        error: error.message || 'Failed to load user',
        isLoggedIn: false,
      });
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.info('Vui lòng đăng nhập lại.');
        router.push('/login');
      }
    }
  }, [router]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (credentials: LoginCredentials) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      const { accessToken, user } = await authService.login(credentials);
      authStorage.setAccessToken(accessToken);
      setAuthState({
        user,
        accessToken,
        isLoading: false,
        error: null,
        isLoggedIn: true,
      });
      toast.success('Đăng nhập thành công!');
      router.push('/dashboard');
    } catch (error: any) {
      if (!axios.isAxiosError(error) || !error.response?.data?.message) {
        toast.error(error.message || 'Đăng nhập thất bại.');
      }
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Đăng nhập thất bại.',
        isLoggedIn: false,
      }));
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      await authService.register(credentials);
      
      const { accessToken: loginToken, user: loginUser } = await authService.login(credentials);
      authStorage.setAccessToken(loginToken);
      setAuthState({
        user: loginUser,
        accessToken: loginToken,
        isLoading: false,
        error: null,
        isLoggedIn: true,
      });
      toast.success('Đăng ký thành công! Đang tự động đăng nhập.');
      router.push('/dashboard');
    } catch (error: any) {
      if (!axios.isAxiosError(error) || !error.response?.data?.message) {
        toast.error(error.message || 'Đăng ký thất bại.');
      }
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Đăng ký thất bại.',
        isLoggedIn: false,
      }));
      throw error;
    }
  };

  const logout = () => {
    authStorage.removeAccessToken();
    setAuthState({
      user: null,
      accessToken: null,
      isLoading: false,
      error: null,
      isLoggedIn: false,
    });
    toast.info('Bạn đã đăng xuất.');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};