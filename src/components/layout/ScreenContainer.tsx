import { ReactNode } from "react";
import { ScrollView, View } from "react-native";

import Header from "@/src/components/Header";
import { useTheme } from "@/src/contexts/ThemeContext";
import { SPACING } from "@/src/theme/layout";
import { router } from "expo-router";

interface Props {
  children: ReactNode;
  scrollable?: boolean;
  modal?: boolean;

  header?: {
    title: string;
    variant?: "menu" | "back" | "search" | "close";
    showLogo?: boolean;
    toggleTheme?: boolean;
    rightComponent?: ReactNode;
  };
}

export default function ScreenContainer({
  children,
  scrollable = true,
  header,
  modal = false,
}: Props) {
  const { colors } = useTheme();
  const content = scrollable ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: SPACING.lg,
        paddingBottom: 100,
      }}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      style={{
        flex: 1,
        padding: SPACING.lg,
      }}
    >
      {children}
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      {/* HEADER OPCIONAL */}
      {header && (
        <Header
          title={header.title}
          variant={modal ? "close" : (header.variant ?? "menu")}
          showLogo={modal ? false : header.showLogo}
          toggleTheme={modal ? false : (header.toggleTheme ?? true)}
          onClosePress={() => router.back()}
          rightComponent={header.rightComponent}
        />
      )}

      {content}
    </View>
  );
}
