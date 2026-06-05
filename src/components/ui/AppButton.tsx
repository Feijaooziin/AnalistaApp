import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";

import { FONT_SIZE, RADIUS, SPACING } from "@/src/theme/layout";

interface AppButtonProps {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;

  icon?: keyof typeof Ionicons.glyphMap;
}

export default function AppButton({
  title,
  onPress,

  loading = false,
  disabled = false,

  icon,
}: AppButtonProps) {
  const { colors } = useTheme();

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      onPress={onPress}
      style={{
        height: 52,

        borderRadius: RADIUS.md,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: isDisabled ? colors.disabled : colors.primary,
      }}
    >
      {loading ? (
        <ActivityIndicator color={colors.textInverse} />
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: SPACING.sm,
          }}
        >
          {icon && (
            <Ionicons name={icon} size={20} color={colors.textInverse} />
          )}

          <Text
            style={{
              fontSize: FONT_SIZE.md,
              fontWeight: "600",
              color: colors.textInverse,
            }}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
