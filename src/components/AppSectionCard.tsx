import { ReactNode } from "react";
import { Text, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, RADIUS, SPACING } from "@/src/theme/layout";

interface Props {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

export default function AppSectionCard({
  title,
  subtitle,
  children,
  size = "md",
}: Props) {
  const { colors } = useTheme();

  const sizes = {
    sm: {
      padding: SPACING.sm,
      title: FONT_SIZE.md,
      subtitle: FONT_SIZE.sm,
    },

    md: {
      padding: SPACING.md,
      title: FONT_SIZE.lg,
      subtitle: FONT_SIZE.md,
    },

    lg: {
      padding: SPACING.lg,
      title: FONT_SIZE.xl,
      subtitle: FONT_SIZE.lg,
    },
  };

  const currentSize = sizes[size];

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: RADIUS.md,
        padding: currentSize.padding,
        marginBottom: SPACING.md,
      }}
    >
      {(title || subtitle) && (
        <View style={{ marginBottom: SPACING.sm }}>
          {title && (
            <Text
              style={{
                fontSize: currentSize.title,
                fontWeight: "700",
                color: colors.text,
              }}
            >
              {title}
            </Text>
          )}

          {subtitle && (
            <Text
              style={{
                marginTop: 2,
                fontSize: currentSize.subtitle,
                color: colors.textSecondary,
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>
      )}

      {children}
    </View>
  );
}
