import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

import AppIcon from "@/src/components/icons/AppIcon";
import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, ICON_SIZE, RADIUS, SPACING } from "@/src/theme/layout";

interface Props {
  title: string;
  subtitle?: string;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  onPress?: () => void;
  size?: "sm" | "md" | "lg";
}

export default function AppListItem({
  title,
  subtitle,
  leftComponent,
  rightComponent,
  onPress,
  size = "md",
}: Props) {
  const { colors } = useTheme();

  const sizes = {
    sm: {
      padding: SPACING.sm,
      title: FONT_SIZE.sm,
      subtitle: FONT_SIZE.xs,
      icon: ICON_SIZE.sm,
    },

    md: {
      padding: SPACING.md,
      title: FONT_SIZE.md,
      subtitle: FONT_SIZE.sm,
      icon: ICON_SIZE.md,
    },

    lg: {
      padding: SPACING.lg,
      title: FONT_SIZE.xl,
      subtitle: FONT_SIZE.md,
      icon: ICON_SIZE.lg,
    },
  };

  const currentSize = sizes[size];

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: currentSize.padding,
        backgroundColor: colors.surface,
        borderRadius: RADIUS.md,
        gap: SPACING.md,
      }}
    >
      {leftComponent}

      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: currentSize.title,
            fontWeight: "600",
          }}
        >
          {title}
        </Text>

        {!!subtitle && (
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: currentSize.subtitle,
              marginTop: 2,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {rightComponent ??
        (onPress && (
          <AppIcon
            name="chevron-forward"
            size={currentSize.icon}
            color={colors.textSecondary}
          />
        ))}
    </Pressable>
  );
}
