import { API_URL, productsApi } from "@/core/api/products.api";
import { type Product } from "../interface/product.interface";

export const getProductById = async (id: string) => {
  try {
    const { data } = await productsApi.get<Product>(`/products/${id}`);
    return {
      ...data,
      images: data.images.map((image) => `${API_URL}/files/product/${image}`),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el producto");
  }
};
