import { useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, RADIUS, SPACING } from "@/src/theme/layout";

interface Props extends TextInputProps {
  label?: string;
  error?: string;
}

export default function AppInput({ label, error, ...rest }: Props) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View style={{ marginBottom: SPACING.md }}>
      {!!label && (
        <Text
          style={{
            marginBottom: 6,
            fontSize: FONT_SIZE.sm,
            color: colors.textSecondary,
            fontWeight: "600",
          }}
        >
          {label}
        </Text>
      )}

      <TextInput
        {...rest}
        placeholderTextColor={colors.textSecondary}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          backgroundColor: colors.surface,

          padding: 14,
          borderRadius: RADIUS.sm,

          borderWidth: 1,
          borderColor: error
            ? colors.danger
            : focused
              ? colors.primary
              : colors.border,

          color: colors.text,
        }}
      />

      {!!error && (
        <Text
          style={{
            marginTop: 4,
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
