import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import React from "react";
import { View } from "react-native";

const HomeScreen = () => {
  const primary = useThemeColor({}, "primary");
  return (
    <View style={{ paddingTop: 100, paddingHorizontal: 20 }}>
      <ThemedText
        style={{ fontSize: 20, fontFamily: "KanitRegular", color: primary }}
      >
        HomeScreen
      </ThemedText>
      <ThemedText
        style={{ fontSize: 20, fontFamily: "KanitBold", color: primary }}
      >
        HomeScreen
      </ThemedText>
      <ThemedText
        style={{ fontSize: 20, fontFamily: "KanitThin", color: primary }}
      >
        HomeScreen
      </ThemedText>
    </View>
  );
};

export default HomeScreen;
