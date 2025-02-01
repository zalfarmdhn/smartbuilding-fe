import { create } from "zustand";
import { setToken } from "../utils/tokenHandler"
import authAPI from "../services/auth";

interface AuthState {
  token: string | null;
  error: string | null;
  login: (email: string, password: string) => void;
}

export const useAuth = create<AuthState>()((set) => ({
  token: null,
  error: null,
  login: async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      if (response.status === 401) {
        throw new Error(response.response.data.error);
      }
      const token: string = response.data.token;
      if(token) {
        setToken(response.data.token);
        set({ token });
      }
      window.location.href = "/";
      return response.data;
    } catch (e) {
      set({ error: `${e}`});
      console.error(e);
    }
  }
}));