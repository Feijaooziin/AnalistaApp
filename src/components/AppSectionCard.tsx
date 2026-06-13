import { ReactNode, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  Pressable,
  Text,
  UIManager,
  View,
} from "react-native";

import AppIcon from "@/src/components/icons/AppIcon";
import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, ICON_SIZE, RADIUS, SPACING } from "@/src/theme/layout";

type Size = "sm" | "md" | "lg";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;

  defaultOpen?: boolean;
  collapsible?: boolean;

  size?: Size;
}

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function AppSectionCard({
  title,
  subtitle,
  children,
  defaultOpen = true,
  collapsible,
  size = "md",
}: Props) {
  const { colors } = useTheme();
  const [open, setOpen] = useState(defaultOpen);

  const sizes = {
    sm: {
      title: FONT_SIZE.md,
      subtitle: FONT_SIZE.sm,
      icon: ICON_SIZE.sm,
      padding: SPACING.sm,
    },
    md: {
      title: FONT_SIZE.lg,
      subtitle: FONT_SIZE.md,
      icon: ICON_SIZE.md,
      padding: SPACING.md,
    },
    lg: {
      title: FONT_SIZE.xl,
      subtitle: FONT_SIZE.lg,
      icon: ICON_SIZE.lg,
      padding: SPACING.lg,
    },
  };

  const current = sizes[size];

  function toggle() {
    if (!collapsible) return;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((prev) => !prev);
  }

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: RADIUS.md,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: "hidden",
        marginBottom: SPACING.md,
      }}
    >
      {/* HEADER */}
      <Pressable
        onPress={toggle}
        style={{
          padding: current.padding,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: current.title,
              fontWeight: "700",
              color: colors.text,
            }}
          >
            {title}
          </Text>

          {subtitle && (
            <Text
              style={{
                marginTop: 2,
                fontSize: current.subtitle,
                color: colors.textSecondary,
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>

        {collapsible && (
          <AppIcon
            name={open ? "chevron-up" : "chevron-down"}
            size={current.icon}
            color={colors.textSecondary}
          />
        )}
      </Pressable>

      {/* CONTENT */}
      {open && (
        <View
          style={{
            paddingHorizontal: current.padding,
            paddingBottom: current.padding,
          }}
        >
          {children}
        </View>
      )}
    </View>
  );
}
