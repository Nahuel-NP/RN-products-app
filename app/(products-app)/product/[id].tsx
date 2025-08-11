import ProductImages from "@/presentation/products/components/ProductImages";
import { useProduct } from "@/presentation/products/hooks/useProduct";
import CustomKeyboardAvoidingView from "@/presentation/shared/CustomKeyboardAvoidVIew";
import { useCameraStore } from "@/presentation/store/useCameraStore";
import MenuIconButton from "@/presentation/theme/components/MenuIconButton";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedButtonGroup from "@/presentation/theme/components/ThemedButtonGroup";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { ThemedView } from "@/presentation/theme/components/ThemedView";
import {
  Redirect,
  router,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

const ProductScreen = () => {
  const { selectedImages, clearImages } = useCameraStore();

  const navigation = useNavigation();

  const { id } = useLocalSearchParams();

  const { productQuery, productMutation } = useProduct(id as string);

  useEffect(() => {
    return () => {
      clearImages();
    };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuIconButton
          icon="camera-outline"
          onPress={() => router.push("/camera")}
        />
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
    <Formik
      initialValues={productQuery.data}
      onSubmit={(productLike) => {
        productMutation.mutate(productLike);
      }}
    >
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        <CustomKeyboardAvoidingView>
          <ScrollView>
            <ProductImages images={[  ...values.images, ...selectedImages]} />
            <ThemedView
              style={{
                paddingHorizontal: 20,
                flexDirection: "column",
                gap: 10,
              }}
            >
              <ThemedTextInput
                placeholder="Titulo"
                value={values.title}
                onChangeText={handleChange("title")}
              />
              <ThemedTextInput
                placeholder="Slug"
                value={values.slug}
                onChangeText={handleChange("slug")}
              />
              <ThemedTextInput
                placeholder="Description"
                multiline
                numberOfLines={4}
                value={values.description}
                onChangeText={handleChange("description")}
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
                value={values.price.toString()}
                onChangeText={handleChange("price")}
                style={{ flex: 1 }}
              />
              <ThemedTextInput
                placeholder="Stock"
                keyboardType="numeric"
                value={values.stock.toString()}
                onChangeText={handleChange("stock")}
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
                selectedOption={values.sizes}
                onSelectedOptionChange={(selectedSize) => {
                  const isSelected = values.sizes.includes(selectedSize);
                  if (isSelected) {
                    setFieldValue(
                      "sizes",
                      values.sizes.filter((size) => size !== selectedSize)
                    );
                  } else {
                    setFieldValue("sizes", [...values.sizes, selectedSize]);
                  }
                }}
              />

              <ThemedButtonGroup
                options={["kid", "men", "women", "unisex"]}
                selectedOption={[values.gender]}
                onSelectedOptionChange={(selectedGender) =>
                  setFieldValue("gender", selectedGender)
                }
              />
            </ThemedView>
            <ThemedView
              style={{
                paddingHorizontal: 20,
                marginTop: 20,
                paddingBottom: 50,
              }}
            >
              <ThemedButton
                onPress={() => {
                  handleSubmit();
                }}
                postPendIcon="save-outline"
              >
                Guardar
              </ThemedButton>
            </ThemedView>
          </ScrollView>
        </CustomKeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default ProductScreen;
