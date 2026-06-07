import { Text, TextInput, View, TextInputProps } from "react-native";

import { COLORS } from "../constants/colors";

interface InputProps extends TextInputProps {
  label: string;
  required?: boolean;
  error?: string;
}

export function Input({
  label,
  multiline = false,
  required,
  error,
  ...rest
}: InputProps) {
  return (
    <View
      style={{
        marginBottom: 16,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: error ? COLORS.danger : COLORS.primary,
          marginBottom: 6,
        }}
      >
        {label}

        {required && (
          <Text
            style={{
              color: COLORS.danger,
            }}
          >
            {" *"}
          </Text>
        )}
      </Text>

      <TextInput
        {...rest}
        multiline={multiline}
        placeholderTextColor={error ? COLORS.danger : COLORS.border}
        style={{
          borderWidth: 1,
          borderColor: error ? COLORS.danger : COLORS.border,
          borderRadius: 10,
          padding: 12,
          backgroundColor: error ? COLORS.errorBackground : COLORS.surface,
          color: COLORS.text,
          minHeight: multiline ? 100 : undefined,
          textAlignVertical: multiline ? "top" : "center",
        }}
      />

      {!!error && (
        <Text
          style={{
            color: COLORS.danger,
            fontSize: 12,
            marginTop: 4,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
