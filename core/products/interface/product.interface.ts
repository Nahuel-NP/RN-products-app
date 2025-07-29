import { User } from "@/core/auth/interface/user";

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: string[];
  gender: Gender;
  tags: string[];
  images: string[];
  user?: User;
}

export enum Gender {
  Kid = "kid",
  Men = "men",
  Women = "women",
}

