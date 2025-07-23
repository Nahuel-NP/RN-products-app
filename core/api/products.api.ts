import axios from "axios";
import { Platform } from "react-native";

const STAGE = process.env.EXPO_PUBLIC_STAGE || "dev";
export const API_URL =
  STAGE === "dev"
    ? process.env.EXPO_PUBLIC_API_URL
    : Platform.OS === "web"
    ? process.env.EXPO_PUBLIC_API_URL_IOS
    : process.env.EXPO_PUBLIC_API_URL_ANDROID;

console.log({ STAGE, [Platform.OS]: API_URL });
const productsApi = axios.create({
  baseURL: API_URL,
});

//TODO: interceptores
export { productsApi };

