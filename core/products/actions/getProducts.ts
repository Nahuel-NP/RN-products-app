import { productsApi } from "../../api/products.api";
import { type Product } from "../interface/product.interface";

export const getProducts = async (limit = 20, offset = 0) => {
  try {
    const { data } = await productsApi.get<Product[]>("/products", {
      params: {
        limit,
        offset,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los productos");
  }
};
