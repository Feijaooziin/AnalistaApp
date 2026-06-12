import { useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, ICON_SIZE, RADIUS, SPACING } from "@/src/theme/layout";
import { Ionicons } from "@expo/vector-icons";

interface Props extends TextInputProps {
  label?: string;

  required?: boolean;
  error?: string;
  clearable?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function AppInput({
  label,
  required,
  error,
  clearable,
  size,
  ...rest
}: Props) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);

  const sizes = {
    sm: {
      padding: SPACING.sm,
      fontSize: FONT_SIZE.sm,
      icon: ICON_SIZE.sm,
    },

    md: {
      padding: SPACING.md,
      fontSize: FONT_SIZE.md,
      icon: ICON_SIZE.md,
    },

    lg: {
      padding: SPACING.lg,
      fontSize: FONT_SIZE.xl,
      icon: ICON_SIZE.lg,
    },
  };

  const currentSize = sizes[size ?? "md"];

  return (
    <View
      style={{
        marginBottom: SPACING.md,
      }}
    >
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

          {required && <Text style={{ color: colors.error }}>{" *"}</Text>}
        </Text>
      )}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",

          backgroundColor: colors.surface,
          borderRadius: RADIUS.sm,
          borderWidth: 1,

          borderColor: error
            ? colors.error
            : focused
              ? colors.inputBorderFocused
              : colors.border,
        }}
      >
        <TextInput
          {...rest}
          placeholderTextColor={colors.placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            padding: currentSize.padding,
            color: colors.text,
            fontSize: currentSize.fontSize,
          }}
        />
        {clearable && !!rest.value && (
          <Ionicons
            name="close-circle-outline"
            size={currentSize.icon}
            color={colors.textSecondary}
            style={{ marginRight: SPACING.sm }}
            onPress={() => rest.onChangeText?.("")}
          />
        )}
      </View>
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
