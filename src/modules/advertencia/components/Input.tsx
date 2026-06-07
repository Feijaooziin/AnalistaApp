import { useTheme } from "@/src/contexts/ThemeContext";
import { Text, TextInput, TextInputProps, View } from "react-native";

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
  const { colors } = useTheme();

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
          color: error ? colors.danger : colors.primary,
          marginBottom: 6,
        }}
      >
        {label}

        {required && (
          <Text
            style={{
              color: colors.danger,
            }}
          >
            {" *"}
          </Text>
        )}
      </Text>

      <TextInput
        {...rest}
        multiline={multiline}
        placeholderTextColor={error ? colors.danger : colors.border}
        style={{
          borderWidth: 1,
          borderColor: error ? colors.danger : colors.border,
          borderRadius: 10,
          padding: 12,
          backgroundColor: error ? colors.danger : colors.surface,
          color: colors.text,
          minHeight: multiline ? 100 : undefined,
          textAlignVertical: multiline ? "top" : "center",
        }}
      />

      {!!error && (
        <Text
          style={{
            color: colors.danger,
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
