import { Pressable, PressableProps } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "../hooks/useThemeColor";
import { ThemedText } from "./ThemedText";
interface Props extends PressableProps {
  prePendIcon?: keyof typeof Ionicons.glyphMap;
  postPendIcon?: keyof typeof Ionicons.glyphMap;
  children: string;
}
const ThemedButton = ({
  prePendIcon,
  postPendIcon,
  children,
  ...rest
}: Props) => {
  const primary = useThemeColor({}, "primary");
  const text = useThemeColor({ light: "white", dark: "white" }, "text");
  return (
    <Pressable
      {...rest}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        gap: 6,
        backgroundColor: primary,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      {prePendIcon && <Ionicons name={prePendIcon} size={24} color={text} />}
      <ThemedText type="subtitle" style={{ color: text }}>
        {children}
      </ThemedText>
      {postPendIcon && <Ionicons name={postPendIcon} size={24} color={text} />}
    </Pressable>
  );
};

export default ThemedButton;
