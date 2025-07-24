import { authLogin, authRegister, checkAuthStatus } from "@/core/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapter";
import { create } from "zustand";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkStatus: () => Promise<void>;
  changeStatus: (token?: string, user?: User) => Promise<boolean>;
  register: (fullName: string, email: string, password: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,

  changeStatus: async (token?: string, user?: User) => {
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      await get().logout();
      return false;
    }
    set({ status: "authenticated", token, user });
    await SecureStorageAdapter.setItem("token", token);
    return true;
  },
  login: async (email: string, password: string) => {
    const response = await authLogin(email, password);
    return get().changeStatus(response?.token, response?.user);
  },
  logout: async () => {
    await SecureStorageAdapter.removeItem("token");
    set({ status: "unauthenticated", token: undefined, user: undefined });
    return;
  },
  checkStatus: async () => {
    const resp = await checkAuthStatus();
    get().changeStatus(resp?.token, resp?.user);
  },
  register: async (fullName: string, email: string, password: string) => {
    const response = await authRegister(fullName, email, password);
    return get().changeStatus(response?.token, response?.user);
  },
}));
