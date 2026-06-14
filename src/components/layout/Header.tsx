import { router, useNavigation } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, ICON_SIZE, SPACING } from "@/src/theme/layout";
import AppIcon from "../icons/AppIcon";

type HeaderVariant = "menu" | "back" | "search" | "close" | "none";

interface HeaderProps {
  title?: string;
  variant?: HeaderVariant;
  showLogo?: boolean;
  toggleTheme?: boolean;
  onSearchPress?: () => void;
  onClosePress?: () => void;
  rightComponent?: React.ReactNode;
}

export default function Header({
  title,
  variant = "menu",
  showLogo = true,
  toggleTheme = false,
  onSearchPress,
  onClosePress,
  rightComponent,
}: HeaderProps) {
  const { colors, isDark, setTheme } = useTheme();
  const navigation = useNavigation<any>();

  async function handleToggleTheme() {
    const nextTheme = isDark ? "light" : "dark";
    await setTheme(nextTheme);
  }

  function renderLeftIcon() {
    switch (variant) {
      case "menu":
        return <AppIcon name="menu" size={ICON_SIZE.xl} color={colors.text} />;

      case "back":
        return (
          <AppIcon name="arrow-back" size={ICON_SIZE.xl} color={colors.text} />
        );

      case "search":
        return (
          <AppIcon name="search" size={ICON_SIZE.xl} color={colors.text} />
        );

      case "close":
        return <AppIcon name="close" size={ICON_SIZE.xl} color={colors.text} />;

      default:
        return null;
    }
  }

  function handlePress() {
    switch (variant) {
      case "menu":
        navigation.openDrawer?.();
        break;

      case "back":
        router.back();
        break;

      case "search":
        onSearchPress?.();
        break;

      case "close":
        onClosePress?.();
        break;
    }
  }

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: SPACING.lg,
          paddingVertical: SPACING.md,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handlePress} hitSlop={10}>
            {renderLeftIcon()}
          </TouchableOpacity>

          {title ? (
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                marginLeft: SPACING.lg,
                fontSize: FONT_SIZE.xl,
                fontWeight: "bold",
                color: colors.text,
              }}
            >
              {title}
            </Text>
          ) : (
            <View style={{ flex: 1 }} />
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: SPACING.md,
            gap: SPACING.xl,
          }}
        >
          {rightComponent}

          {!rightComponent && (
            <>
              {toggleTheme && (
                <TouchableOpacity onPress={handleToggleTheme} hitSlop={10}>
                  <AppIcon
                    name={isDark ? "sunny-outline" : "moon-outline"}
                    size={ICON_SIZE.lg}
                    color={colors.text}
                  />
                </TouchableOpacity>
              )}

              {showLogo && (
                <AppIcon
                  name="ecla-icon"
                  size={ICON_SIZE.xxl}
                  color={colors.text}
                />
              )}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
