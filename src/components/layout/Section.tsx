import { ReactNode } from "react";
import { View } from "react-native";

import { SPACING } from "@/src/theme/layout";

interface Props {
  children: ReactNode;
}

export default function Section({ children }: Props) {
  return (
    <View
      style={{
        marginBottom: SPACING.xl,
      }}
    >
      {children}
    </View>
  );
}
