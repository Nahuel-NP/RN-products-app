import { emailRegex, passwordRegex } from "@/constants/Regex";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import CustomKeyboardAvoidingView from "@/presentation/shared/CustomKeyboardAvoidVIew";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";

const RegisterScreen = () => {
  const backgroundColor = useThemeColor({}, "background");
  const { register } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onFullNameChange = (text: string) => {
    setForm({ ...form, name: text });
    if (text.length === 0) {
      setFormErrors({ ...formErrors, name: "El nombre es requerido" });
    } else {
      setFormErrors({ ...formErrors, name: "" });
    }
  };

  const onEmailChange = (text: string) => {
    setForm({ ...form, email: text });
    if (text.length === 0 || !emailRegex.test(text)) {
      setFormErrors({ ...formErrors, email: "El correo es requerido" });
    } else {
      setFormErrors({ ...formErrors, email: "" });
    }
  };

  const onPasswordChange = (text: string) => {
    setForm({ ...form, password: text });
    if (text.length === 0 || !passwordRegex.test(text)) {
      setFormErrors({ ...formErrors, password: "La contraseña es requerida" });
    } else {
      setFormErrors({ ...formErrors, password: "" });
    }
  };

  const onConfirmPasswordChange = (text: string) => {
    setForm({ ...form, confirmPassword: text });
    if (text.length === 0 || (text !== form.password && text.length > 0)) {
      setFormErrors({
        ...formErrors,
        confirmPassword: "La confirmacion de la contraseña es requerida",
      });
    } else {
      setFormErrors({ ...formErrors, confirmPassword: "" });
    }
  };

  const handleRegister = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }
    setIsPosting(true);
    const wasSuccess = await register(form.name, form.email, form.password);
    setIsPosting(false);
    if (wasSuccess) {
      router.replace("/");
      return;
    }

    Alert.alert("Error", "Error al crear la cuenta");
  };

  return (
    <CustomKeyboardAvoidingView>
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
              value={form.name}
              onChangeText={onFullNameChange}
              hasError={formErrors.name.length > 0}
            />
            <ThemedTextInput
              placeholder="Correo Electronico"
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
              value={form.email}
              onChangeText={onEmailChange}
              hasError={formErrors.email.length > 0}
            />
            <ThemedTextInput
              placeholder="Contraseña"
              keyboardType="default"
              autoCapitalize="none"
              secureTextEntry
              icon="lock-closed-outline"
              value={form.password}
              onChangeText={onPasswordChange}
              hasError={formErrors.password.length > 0}
            />
            <ThemedTextInput
              placeholder="Confirmar contraseña"
              keyboardType="default"
              autoCapitalize="none"
              secureTextEntry
              icon="lock-closed-outline"
              value={form.confirmPassword}
              onChangeText={onConfirmPasswordChange}
              hasError={formErrors.confirmPassword.length > 0}
            />
          </View>
          <ThemedButton
            disabled={Object.values(formErrors).some(
              (error) => error.length > 0
            )}
            postPendIcon="arrow-forward-outline"
            onPress={() => {
              handleRegister();
            }}
          >
            Registrar
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
              ¿Ya tienes cuenta?
            </ThemedText>
            <ThemedLink dismissTo href="/auth/login" style={{ fontSize: 18 }}>
              Iniciar sesión
            </ThemedLink>
          </View>
        </View>
      </ScrollView>
    </CustomKeyboardAvoidingView>
  );
};

export default RegisterScreen;
