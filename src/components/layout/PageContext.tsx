import { ReactNode } from "react";
import { Text, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, SPACING } from "@/src/theme/layout";

interface Props {
  title: string;
  subtitle?: string;

  rightComponent?: ReactNode;
}

export default function PageContext({
  title,
  subtitle,
  rightComponent,
}: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        marginBottom: SPACING.lg,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* LEFT */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: FONT_SIZE.xl,
            fontWeight: "bold",
            color: colors.text,
          }}
        >
          {title}
        </Text>

        {!!subtitle && (
          <Text
            style={{
              marginTop: 2,
              fontSize: FONT_SIZE.sm,
              color: colors.textSecondary,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {/* RIGHT */}
      {rightComponent && <View>{rightComponent}</View>}
    </View>
  );
}
