import { getProducts } from "@/core/products/actions/getProducts";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const productsQuery = useInfiniteQuery({
    queryKey: ["products", "infinite"],
    queryFn: ({ pageParam = 0 }) => getProducts(20, pageParam * 20),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 20) return undefined;
      return allPages.length;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60, // 1 hora
  });
  return {
    productsQuery,
    fetchNextPage: productsQuery.fetchNextPage,
  };
};
