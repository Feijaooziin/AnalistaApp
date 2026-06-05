import { ReactNode } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/src/contexts/ThemeContext";
import { SPACING } from "@/src/theme/layout";

interface Props {
  children: ReactNode;
  scrollable?: boolean;
}

export default function ScreenContainer({
  children,
  scrollable = true,
}: Props) {
  const { colors } = useTheme();

  if (!scrollable) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.background,
          paddingHorizontal: SPACING.lg,
        }}
      >
        {children}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: SPACING.lg,
          paddingBottom: 100,
        }}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
