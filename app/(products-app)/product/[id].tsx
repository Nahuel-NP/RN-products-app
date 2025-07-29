import ProductImages from "@/presentation/products/components/ProductImages";
import { useProduct } from "@/presentation/products/hooks/useProduct";
import CustomKeyboardAvoidingView from "@/presentation/shared/CustomKeyboardAvoidVIew";
import ThemedButtonGroup from "@/presentation/theme/components/ThemedButtonGroup";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

const ProductScreen = () => {
  const navigation = useNavigation();

  const { id } = useLocalSearchParams();

  const { productQuery } = useProduct(id as string);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons name="camera-outline" size={24} color="black" />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (!productQuery.data) {
      return;
    }
    navigation.setOptions({
      title: productQuery.data.title,
    });
  }, [productQuery.data, navigation]);

  if (productQuery.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (productQuery.isError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText>Error al cargar el producto</ThemedText>
      </View>
    );
  }

  if (!productQuery.data) {
    return <Redirect href="/(products-app)/(home)" />;
  }

  return (
    <CustomKeyboardAvoidingView>
      <ScrollView>
        <ProductImages images={productQuery.data.images} />
        <ThemedView
          style={{ paddingHorizontal: 20, flexDirection: "column", gap: 10 }}
        >
          <ThemedTextInput placeholder="Titulo" />
          <ThemedTextInput placeholder="Slug" />
          <ThemedTextInput
            placeholder="Description"
            multiline
            numberOfLines={4}
          />
        </ThemedView>
        <ThemedView
          style={{
            paddingHorizontal: 20,
            flexDirection: "row",
            gap: 10,
            marginTop: 20,
          }}
        >
          <ThemedTextInput
            placeholder="Precio"
            keyboardType="numeric"
            style={{ flex: 1 }}
          />
          <ThemedTextInput
            placeholder="Stock"
            keyboardType="numeric"
            style={{ flex: 1 }}
          />
        </ThemedView>
        <ThemedView
          style={{
            paddingHorizontal: 20,
            marginVertical: 20,
            gap: 20,
            flexDirection: "column",
          }}
        >
          <ThemedButtonGroup
            options={["XS", "S", "M", "L", "XL", "XXL", "XXXL"]}
            selectedOption={productQuery.data.sizes}
            onSelectedOptionChange={(option) => {
              console.log(option);
            }}
          />

          <ThemedButtonGroup
            options={["kid", "men", "women", "unisex"]}
            selectedOption={[productQuery.data.gender]}
            onSelectedOptionChange={(option) => {
              console.log(option);
            }}
          />
        </ThemedView>
      </ScrollView>
    </CustomKeyboardAvoidingView>
  );
};

export default ProductScreen;
