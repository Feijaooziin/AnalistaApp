import { ReactNode } from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/src/contexts/ThemeContext";

import { SPACING } from "@/src/theme/layout";

type Props = {
  children: ReactNode;
  padding?: boolean;
};

export default function ScreenContainer({ children, padding = true }: Props) {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: padding ? SPACING.lg : 0,
      }}
    >
      {children}
    </SafeAreaView>
  );
}
