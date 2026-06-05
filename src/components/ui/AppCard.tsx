import { ReactNode } from "react";
import { View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { RADIUS, SHADOWS, SPACING } from "@/src/theme/layout";

interface Props {
  children: ReactNode;
}

export default function AppCard({ children }: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: RADIUS.lg,
        padding: SPACING.lg,

        ...SHADOWS.card,
      }}
    >
      {children}
    </View>
  );
}
