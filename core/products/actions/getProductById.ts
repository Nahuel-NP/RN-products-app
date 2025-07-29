import { API_URL, productsApi } from "@/core/api/products.api";
import { Gender, type Product } from "../interface/product.interface";

const emptyProduct: Product = {
  id: "",
  title: "New product",
  slug: "new-product",
  description: "",
  images: [],
  price: 0,
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
};
export const getProductById = async (id: string) => {
  if (id === "new") {
    return emptyProduct;
  }
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
