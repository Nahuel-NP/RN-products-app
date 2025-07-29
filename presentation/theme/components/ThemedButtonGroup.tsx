import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

interface Props {
  options: string[];
  selectedOption: string[];
  onSelectedOptionChange: (option: string) => void;
}
const ThemedButtonGroup = ({
  options,
  selectedOption,
  onSelectedOptionChange,
}: Props) => {
  const primaryColor = useThemeColor({}, "primary");
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => onSelectedOptionChange(option)}
          style={[
            styles.button,
            selectedOption.includes(option) && {
              backgroundColor: primaryColor,
              borderColor: primaryColor,
            },
          ]}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[
              styles.buttonText,
              selectedOption.includes(option) && styles.selectedButtonText,
            ]}
          >
            {option[0].toUpperCase() + option.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ThemedButtonGroup;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    flex: 1,
    gap: 10,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    flex: 1,
  },
  buttonText: {
    fontFamily: "KanitRegular",
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
  selectedButtonText: {
    color: "#fff",
  },
});
