import LogoutIconButton from "@/presentation/auth/components/LogoutIconButton";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";

const CheckAuthenticationLayout = () => {
  const { status, checkStatus } = useAuthStore();

  const backgroundColor = useThemeColor({}, "background");
  useEffect(() => {
    checkStatus();
  }, []);

  if (status === "checking") {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (status === "unauthenticated") {
    return <Redirect href="/auth/login" />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor },
          contentStyle: { backgroundColor },
        }}
      >
        <Stack.Screen
          name="(home)/index"
          options={{
            title: "Products",
            headerLeft: () => <LogoutIconButton />,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
};

export default CheckAuthenticationLayout;
