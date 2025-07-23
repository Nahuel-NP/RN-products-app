import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";

const LoginScreen = () => {
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
          <ThemedText type="title">Ingresar</ThemedText>
          <ThemedText style={{ color: "gray" }} type="subtitle">
            Por favor ingrese para continuar
          </ThemedText>
          <View style={{ marginVertical: 20, gap: 10 }}>
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
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
