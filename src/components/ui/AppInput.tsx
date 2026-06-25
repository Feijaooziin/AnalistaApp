import { forwardRef, useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, ICON_SIZE, RADIUS, SPACING } from "@/src/theme/layout";
import AppIcon from "../icons/AppIcon";

interface Props extends TextInputProps {
  label?: string;
  onChangeText?: (text: string) => void;
  required?: boolean;
  error?: string;
  clearable?: boolean;
  size?: "sm" | "md" | "lg";
}

const AppInput = forwardRef<TextInput, Props>(
  (
    { label, onChangeText, required, error, clearable = false, size, ...rest },
    ref,
  ) => {
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

    function clear() {
      onChangeText?.("");
    }

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
            borderWidth: 1,
            backgroundColor: colors.surface,
            borderRadius: RADIUS.sm,
            paddingHorizontal: currentSize.padding,
            borderColor: error
              ? colors.error
              : focused
                ? colors.inputBorderFocused
                : colors.border,
          }}
        >
          <TextInput
            {...rest}
            ref={ref}
            onChangeText={onChangeText}
            placeholderTextColor={colors.placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{
              flex: 1,
              color: colors.text,
              fontSize: currentSize.fontSize,
              paddingVertical: currentSize.padding,
            }}
          />

          {clearable && (
            <AppIcon
              name="close-circle-outline"
              size={currentSize.icon}
              color={colors.textSecondary}
              onPress={clear}
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
  },
);

export default AppInput;
