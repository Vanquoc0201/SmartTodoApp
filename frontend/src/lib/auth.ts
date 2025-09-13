const ACCESS_TOKEN_KEY  = 'accessToken';


export const authStorage = {
  setAccessToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }
  },

  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    }
    return null;
  },

  removeAccessToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  },
};