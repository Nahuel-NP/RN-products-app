import { productsApi } from "@/core/api/products.api";
import { Product } from "../interface/product.interface";

export const createUpdateProduct = async (productLike: Partial<Product>) => {
  productLike.stock = isNaN(Number(productLike.stock))
    ? 0
    : Number(productLike.stock);

  productLike.price = isNaN(Number(productLike.price))
    ? 0
    : Number(productLike.price);

  if (productLike.id && productLike.id !== "new") {
    return updateProduct(productLike);
  }
  return createProduct(productLike);
};
async function updateProduct(productLike: Partial<Product>) {
  const { id, images = [], user, ...rest } = productLike;
  try {
    const { data } = await productsApi.patch<Product>(`/products/${id}`, {
      ...rest,
      //TODO: images
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al actualizar el producto");
  }
}
async function createProduct(productLike: Partial<Product>) {
  const { images = [], user, ...rest } = productLike;
  try {
    const { data } = await productsApi.post<Product>(`/products`, {
      ...rest,
      //TODO: images
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear el producto");
  }
}
