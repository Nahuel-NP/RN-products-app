import { Product } from "@/core/products/interface/product.interface";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
  loadNextPage: () => void;
}
const ProductsList = ({ products, loadNextPage }: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const queryClient = useQueryClient();
  const onPullToRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    queryClient.invalidateQueries({
      queryKey: ["products", "infinite"],
    });
    setIsRefreshing(false);
  };
  return (
    <FlatList
      data={products}
      numColumns={2}
      renderItem={({ item }) => <ProductCard product={item} />}
      keyExtractor={(item) => item.id}
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};

export default ProductsList;
