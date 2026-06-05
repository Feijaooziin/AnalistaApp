import { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/src/contexts/ThemeContext";
import { SPACING } from "@/src/theme/layout";

import Header from "@/src/components/Header";

interface Props {
  children: ReactNode;

  scrollable?: boolean;

  header?: {
    title: string;
    variant?: "menu" | "back" | "search" | "close";
    showLogo?: boolean;
    rightComponent?: ReactNode;
  };
}

export default function ScreenContainer({
  children,
  scrollable = true,
  header,
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
        paddingHorizontal: SPACING.lg,
      }}
    >
      {children}
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      {/* HEADER OPCIONAL */}
      {header && (
        <Header
          title={header.title}
          variant={header.variant ?? "menu"}
          showLogo={header.showLogo}
          rightComponent={header.rightComponent}
        />
      )}

      {content}
    </SafeAreaView>
  );
}
