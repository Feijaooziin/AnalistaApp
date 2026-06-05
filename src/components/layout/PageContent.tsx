import { ReactNode } from "react";
import { ScrollView } from "react-native";

import { SPACING } from "@/src/theme/layout";

interface Props {
  children: ReactNode;
}

export default function PageContent({ children }: Props) {
  return (
    <ScrollView
      contentContainerStyle={{
        padding: SPACING.lg,
      }}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}
