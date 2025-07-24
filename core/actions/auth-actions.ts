import { productsApi } from "../api/products.api";
import { User } from "../auth/interface/user";

export interface AuthResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

const returnUserToken = (data: AuthResponse): { user: User; token: string } => {
  const { token, ...user } = data;
  /*  const { token, id, email, fullName, isActive, roles } = data;

  const user: User = {
    id,
    email,
    fullName,
    isActive,
    roles,
  }; */

  return { token, user };
};

export const authLogin = async (email: string, password: string) => {
  const emailLower = email.toLowerCase();
  console.log("🚀 ~ authLogin ~ emailLower:", emailLower)
  console.log("🚀 ~ authLogin ~ password:", password)
  try {
    const { data } = await productsApi.post<AuthResponse>("/auth/login", {
      email: emailLower,
      password,
    });
    return returnUserToken(data);
  } catch (error) {
    console.log("🚀 ~ authLogin ~ error:", error)
    
    // throw new Error("Error al iniciar sesión");
    return null;
  }
};

export const checkAuthStatus = async () => {
  try {
    const { data } = await productsApi.get<AuthResponse>("/auth/check-status");
    return returnUserToken(data);
  } catch (error) {
    console.log(error);
    // throw new Error("Error al verificar sesión");
    return null;
  }
};

//TODO: register
