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

const prepareImages = async (images: string[]): Promise<string[]> => {
  const fileImages = images.filter((image) => image.startsWith("file"));
  const currentImages = images.filter((image) => !image.startsWith("file"));

  if (fileImages.length > 0) {
    const uploadPromises = fileImages.map((image) => uploadImage(image));
    const uploadedImages = await Promise.all(uploadPromises);
    currentImages.push(...uploadedImages);
  }
  return currentImages.map((img) => img.split("/").pop()!);
};

const uploadImage = async (image: string): Promise<string> => {
  const formData = new FormData() as any;
  formData.append("file", {
    uri: image,
    type: "image/jpeg",
    name: image.split("/").pop(),
  });

  const { data } = await productsApi.post<{ image: string }>(
    "/files/product",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log("🚀 ~ uploadImage ~ data:", data)
  return data.image;
};

async function updateProduct(productLike: Partial<Product>) {
  console.log({ images: productLike.images });
  const { id, images = [], user, ...rest } = productLike;
  try {
    const checkedImages = await prepareImages(images);
    console.log("🚀 ~ updateProduct ~ checkedImages:", checkedImages)
    const { data } = await productsApi.patch<Product>(`/products/${id}`, {
      ...rest,
      images: checkedImages,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al actualizar el producto");
  }
}
async function createProduct(productLike: Partial<Product>) {
  const { id, images = [], user, ...rest } = productLike;

  try {
    const checkedImages = await prepareImages(images);
    const { data } = await productsApi.post<Product>(`/products`, {
      ...rest,
      images: checkedImages,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear el producto");
  }
}
