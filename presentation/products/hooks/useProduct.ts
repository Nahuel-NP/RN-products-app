import { createUpdateProduct } from "@/core/products/actions/create-update-product.action";
import { getProductById } from "@/core/products/actions/getProductById";
import { Product } from "@/core/products/interface/product.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Alert } from "react-native";

export const useProduct = (productId: string) => {
  const queryClient = useQueryClient();

  const productIdRef = useRef(productId); // new, uuid
  const productQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60,
  });

  // mutation
  const productMutation = useMutation({
    mutationFn: async (data: Product) =>
      createUpdateProduct({
        ...data,
        id: productIdRef.current,
      }),
    onSuccess(data: Product) {
      productIdRef.current = data.id;
      queryClient.invalidateQueries({
        queryKey: ["product", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["products", "infinite"],
      });
      Alert.alert("Producto guardado correctamente", data.title);
    },
    onError(error) {
      Alert.alert("Error al guardar el producto");
    },
  });

  //keep product id
  return {
    productQuery,
    productMutation,
  };
};
