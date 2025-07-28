import { getProductById } from "@/core/products/actions/getProductById";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (productId: string) => {
  const productQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    staleTime: 1000 * 60 * 60,
  });


  // mutation

  //keep product id
  return {
    productQuery,
  };
};
