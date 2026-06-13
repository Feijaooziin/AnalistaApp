import { Text, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, RADIUS, SPACING } from "@/src/theme/layout";

type Variant =
  | "primary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "neutral";

interface Props {
  label: string;
  variant?: Variant;
  size?: "sm" | "md" | "lg";
}

export default function AppBadge({
  label,
  variant = "neutral",
  size = "md",
}: Props) {
  const { colors } = useTheme();

  const sizes = {
    sm: {
      paddingHorizontal: SPACING.sm,
      paddingVertical: 2,
      fontSize: FONT_SIZE.xs,
    },

    md: {
      paddingHorizontal: SPACING.md,
      paddingVertical: 4,
      fontSize: FONT_SIZE.sm,
    },

    lg: {
      paddingHorizontal: SPACING.lg,
      paddingVertical: 6,
      fontSize: FONT_SIZE.md,
    },
  };

  const currentSize = sizes[size];

  const variants = {
    primary: {
      backgroundColor: colors.primary,
      color: "#FFF",
    },

    success: {
      backgroundColor: colors.success,
      color: "#FFF",
    },

    danger: {
      backgroundColor: colors.danger,
      color: "#FFF",
    },

    warning: {
      backgroundColor: colors.warning,
      color: "#FFF",
    },

    info: {
      backgroundColor: colors.info,
      color: "#FFF",
    },

    neutral: {
      backgroundColor: colors.surface,
      color: colors.text,
    },
  };

  const currentVariant = variants[variant];

  return (
    <View
      style={{
        alignSelf: "flex-start",
        backgroundColor: currentVariant.backgroundColor,
        paddingHorizontal: currentSize.paddingHorizontal,
        paddingVertical: currentSize.paddingVertical,
        borderRadius: RADIUS.full,
      }}
    >
      <Text
        style={{
          color: currentVariant.color,
          fontSize: currentSize.fontSize,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
    </View>
  );
}
