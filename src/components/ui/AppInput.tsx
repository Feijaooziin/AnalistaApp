import { useState } from "react";

import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";

import { FONT_SIZE, RADIUS, SPACING } from "@/src/theme/layout";

interface AppInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
}

export default function AppInput({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline = false,
  keyboardType = "default",
  secureTextEntry = false,
}: AppInputProps) {
  const { colors } = useTheme();

  const [focused, setFocused] = useState(false);

  return (
    <View
      style={{
        marginBottom: SPACING.lg,
      }}
    >
      {!!label && (
        <Text
          style={{
            marginBottom: SPACING.sm,

            fontSize: FONT_SIZE.sm,
            fontWeight: "600",

            color: colors.text,
          }}
        >
          {label}
        </Text>
      )}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          minHeight: multiline ? 120 : 52,
          borderWidth: 1,
          borderRadius: RADIUS.md,
          paddingHorizontal: SPACING.lg,
          paddingVertical: SPACING.md,
          backgroundColor: colors.input,
          borderColor: error
            ? colors.danger
            : focused
              ? colors.inputBorderFocused
              : colors.inputBorder,
          color: colors.text,
          textAlignVertical: multiline ? "top" : "center",
        }}
      />

      {!!error && (
        <Text
          style={{
            marginTop: SPACING.xs,
            fontSize: FONT_SIZE.xs,
            color: colors.danger,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
