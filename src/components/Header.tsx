import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";

import { Image, Text, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/src/contexts/ThemeContext";

import { FONT_SIZE, ICON_SIZE, SPACING } from "@/src/theme/layout";

type HeaderVariant = "menu" | "back" | "search" | "close";

interface HeaderProps {
  title?: string;
  variant?: HeaderVariant;

  showLogo?: boolean;

  onSearchPress?: () => void;
  onClosePress?: () => void;

  rightComponent?: React.ReactNode;
}

export default function Header({
  title = "Analista App",
  variant = "menu",

  showLogo = true,

  onSearchPress,
  onClosePress,

  rightComponent,
}: HeaderProps) {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  function renderLeftIcon() {
    switch (variant) {
      case "menu":
        return <Ionicons name="menu" size={ICON_SIZE.xl} color={colors.text} />;

      case "back":
        return (
          <Ionicons name="arrow-back" size={ICON_SIZE.xl} color={colors.text} />
        );

      case "search":
        return (
          <Ionicons name="search" size={ICON_SIZE.xl} color={colors.text} />
        );

      case "close":
        return (
          <Ionicons name="close" size={ICON_SIZE.xl} color={colors.text} />
        );

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
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: SPACING.md,
          }}
        >
          {rightComponent}

          {!rightComponent && showLogo && (
            <Image
              source={require("@/assets/images/ECLA/ECLA-Icon-Color.png")}
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
              }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
