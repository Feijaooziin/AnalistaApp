import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/src/contexts/ThemeContext";

interface Props {
  children: ReactNode;
}

export default function ScreenContainer({ children }: Props) {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      {children}
    </SafeAreaView>
  );
}
