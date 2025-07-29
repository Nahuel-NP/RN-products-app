import { FlatList, Image, View } from "react-native";
interface Props {
  images: string[];
}
const ProductImages = ({ images }: Props) => {
  if (images.length === 0) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Image
          source={require("../../../assets/images/no-product-image.png")}
          style={{ width: 300, height: 300 }}
        />
      </View>
    );
  }
  return (
    <>
      <FlatList
        style={{ marginBottom: 20 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={images}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={{
              width: 300,
              height: 300,
              marginHorizontal: 10,
              aspectRatio: 1,
            }}
          />
        )}
      />
    </>
  );
};

export default ProductImages;
