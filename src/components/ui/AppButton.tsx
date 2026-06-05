import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, RADIUS, SPACING } from "@/src/theme/layout";

interface Props {
  title: string;
  onPress: () => void | Promise<void>;

  loading?: boolean;
  disabled?: boolean;
}

export default function AppButton({
  title,
  onPress,
  loading = false,
  disabled = false,
}: Props) {
  const { colors } = useTheme();

  const isDisabled = loading || disabled;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isDisabled}
      style={{
        backgroundColor: isDisabled ? colors.textMuted : colors.primary,

        padding: SPACING.md,
        borderRadius: RADIUS.sm,

        alignItems: "center",
        justifyContent: "center",

        opacity: isDisabled ? 0.6 : 1,
      }}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text
          style={{
            color: "#fff",
            fontSize: FONT_SIZE.md,
            fontWeight: "600",
          }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
