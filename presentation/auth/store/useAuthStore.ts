import { authLogin, checkAuthStatus } from "@/core/actions/auth-actions";
import { User } from "@/core/auth/interface/user";
import { create } from "zustand";

export type AuthStatus = "authenticated" | "unauthenticated" | "checking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  status: "checking",
  token: undefined,
  user: undefined,
  login: async (email: string, password: string) => {
    const response = await authLogin(email, password);
    if (!response) {
      set({ status: "unauthenticated" });
      return false;
    }
    const { token, user } = response;
    set({ status: "authenticated", token, user });

    //TODO: guardar token en secure storage
    return true;
  },
  logout: async () => {
    //TODO: borrar token de secure storage
    set({ status: "unauthenticated", token: undefined, user: undefined });
    return;
  },
  checkStatus: async () => {
    const resp = await checkAuthStatus();
    if (!resp) {
      set({ status: "unauthenticated" });
      return;
    }
    const { token, user } = resp;
    set({ status: "authenticated", token, user });
    return;
  },
}));
