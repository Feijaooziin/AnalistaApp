import { Text, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, SPACING } from "@/src/theme/layout";

interface Props {
  title: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
}

export default function SectionTitle({ title, subtitle, size = "md" }: Props) {
  const { colors } = useTheme();

  const sizes = {
    sm: {
      title: FONT_SIZE.lg,
      subtitle: FONT_SIZE.sm,
    },

    md: {
      title: FONT_SIZE.xl,
      subtitle: FONT_SIZE.md,
    },

    lg: {
      title: FONT_SIZE.xxl,
      subtitle: FONT_SIZE.lg,
    },
  };

  const currentSize = sizes[size];

  return (
    <View
      style={{
        marginBottom: SPACING.md,
      }}
    >
      <Text
        style={{
          fontSize: currentSize.title,
          fontWeight: "700",
          color: colors.text,
        }}
      >
        {title}
      </Text>

      {subtitle && (
        <Text
          style={{
            fontSize: currentSize.subtitle,
            color: colors.textSecondary,
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}
