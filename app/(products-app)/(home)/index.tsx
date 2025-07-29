import ProductsList from "@/presentation/products/components/ProductsList";
import { useProducts } from "@/presentation/products/hooks/useProducts";
import { FAB } from "@/presentation/shared/FAB";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

const HomeScreen = () => {
  const primary = useThemeColor({}, "primary");
  const { productsQuery, fetchNextPage } = useProducts();

  if (productsQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  if (productsQuery.isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error al cargar los productos</Text>
      </View>
    );
  }

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <ProductsList
        products={productsQuery.data?.pages.flatMap((page) => page) ?? []}
        loadNextPage={fetchNextPage}
      />
      <FAB
        iconName="add"
        onPress={() => router.push("/(products-app)/product/new")}
      />
    </View>
  );
};

export default HomeScreen;
