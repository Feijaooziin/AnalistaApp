import { ReactNode, useState } from "react";
import { LayoutAnimation, Pressable, Text, View } from "react-native";

import AppIcon from "@/src/components/icons/AppIcon";
import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, ICON_SIZE, RADIUS, SPACING } from "@/src/theme/layout";

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  collapsible?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function AppSectionCard({
  title,
  subtitle,
  children,
  collapsible,
  defaultOpen,
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

  const childrenArray = Array.isArray(children) ? children : [children];

  function toggle() {
    if (!collapsible) return;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((prev) => !prev);
  }

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: RADIUS.md,
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

      {/* CONTENT WITH DIVIDERS */}
      {open && (
        <View>
          {childrenArray.map((child, index) => {
            const isLast = index === childrenArray.length - 1;

            return (
              <View
                key={index}
                style={{
                  paddingHorizontal: current.padding,
                  paddingVertical: SPACING.sm,
                  borderTopWidth: index === 0 ? 0.5 : 0,
                  borderTopColor: colors.border,
                  borderBottomWidth: isLast ? 0 : 1,
                  borderBottomColor: colors.border,
                }}
              >
                {child}
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
}
