import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

const LoginScreen = () => {
  const backgroundColor = useThemeColor({}, "background");

  const { login } = useAuthStore();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isPosting, setIsPosting] = useState(false);

  const handleLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }
    console.log(form);
    setIsPosting(true);
    const wasSuccess = await login(form.email, form.password);
    setIsPosting(false);
    if (wasSuccess) {
      router.replace("/");
      return;
    }

    Alert.alert("Error", "Usuario o contraseña incorrectos");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 20,
            paddingBottom: 20, // Evita espacio vacío al cerrar el teclado
          }}
        >
          <View>
            <ThemedText type="title">Ingresar</ThemedText>
            <ThemedText style={{ color: "#bbb" }} type="subtitle">
              Por favor ingrese para continuar
            </ThemedText>

            <View style={{ marginVertical: 20, gap: 10 }}>
              <ThemedTextInput
                placeholder="Correo Electronico"
                keyboardType="email-address"
                autoCapitalize="none"
                icon="mail-outline"
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
              />
              <ThemedTextInput
                placeholder="Contraseña"
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry
                icon="lock-closed-outline"
                value={form.password}
                onChangeText={(text) => setForm({ ...form, password: text })}
              />
            </View>

            <ThemedButton
              disabled={isPosting}
              postPendIcon="arrow-forward-outline"
              onPress={handleLogin}
            >
              Ingresar
            </ThemedButton>

            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                justifyContent: "center",
              }}
            >
              <ThemedText style={{ color: "white", fontSize: 18 }} type="default">
                ¿No tienes cuenta?
              </ThemedText>
              <ThemedLink push href="/auth/register" style={{ fontSize: 18 }}>
                Crear cuenta
              </ThemedLink>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
