import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  hasError?: boolean;
  showPassword?: boolean;
}
const ThemedTextInput = ({
  icon,
  hasError,
  secureTextEntry = false,
  style,
  ...rest
}: Props) => {
  const primaryColor = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");

  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  return (
    <View
      style={[
        {
          ...styles.border,
          borderColor: hasError ? "red" : isFocused ? primaryColor : "#bbb",
        },
        style as ViewStyle,
      ]}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
        onTouchStart={() => inputRef.current?.focus()}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={24}
            color={textColor}
            style={{ marginRight: 6 }}
          />
        )}
        <TextInput
          placeholderTextColor="#bbb"
          {...rest}
          ref={inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ color: textColor, flex: 1 }}
          secureTextEntry={secureTextEntry && !showPassword}
        />
      </View>
      {secureTextEntry && (
        <Ionicons
          onPress={() => setShowPassword(!showPassword)}
          name={showPassword ? "eye-off-outline" : "eye-outline"}
          size={24}
          color={textColor}
          style={{ marginLeft: 6 }}
        />
      )}
    </View>
  );
};

export default ThemedTextInput;

const styles = StyleSheet.create({
  border: {
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
});
