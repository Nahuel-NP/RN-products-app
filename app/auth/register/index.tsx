import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";

const RegisterScreen = () => {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        style={{ backgroundColor }}
        contentContainerStyle={{
          justifyContent: "center",
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        <View style={{}}>
          <ThemedText type="title">Crear Cuenta</ThemedText>
          <ThemedText style={{ color: "#bbb" }} type="subtitle">
            Para continuar, cree una cuenta.
          </ThemedText>
          <View style={{ marginVertical: 20, gap: 10 }}>
            <ThemedTextInput
              placeholder="Nombre completo"
              keyboardType="default"
              autoCapitalize="none"
              icon="person-outline"
            />
            <ThemedTextInput
              placeholder="Correo Electronico"
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
            />
            <ThemedTextInput
              placeholder="Contraseña"
              keyboardType="default"
              autoCapitalize="none"
              secureTextEntry
              icon="lock-closed-outline"
            />
            <ThemedTextInput
              placeholder="Confirmar contraseña"
              keyboardType="default"
              autoCapitalize="none"
              secureTextEntry
              icon="lock-closed-outline"
            />
          </View>
          <ThemedButton
            postPendIcon="arrow-forward-outline"
            onPress={() => {
              console.log("Registrar");
            }}
          >
            Registrar
          </ThemedButton>
          <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "center" }}>
            <ThemedText style={{ color: "white",fontSize: 18 }} type="default">
              ¿Ya tienes cuenta?
            </ThemedText>
            <ThemedLink dismissTo href="/auth/login" style={{ fontSize: 18 }}>Iniciar sesión</ThemedLink>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
