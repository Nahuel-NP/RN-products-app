import React, { PropsWithChildren, useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform } from "react-native";

const CustomKeyboardAvoidingView = ({ children }: PropsWithChildren) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardVisible(true)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardVisible(false)
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView
      enabled={keyboardVisible}
      style={{ flex: 1 }}
      keyboardVerticalOffset={40}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardAvoidingView;
