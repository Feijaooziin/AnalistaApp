import { Pressable, Text, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import AppIcon from "../icons/AppIcon";

interface AppChipProps {
  label: string;
  onRemove?: () => void;
}

export default function AppChip({ label, onRemove }: AppChipProps) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: colors.primary + "20",
      }}
    >
      <Text
        style={{
          color: colors.primary,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>

      {onRemove && (
        <Pressable onPress={onRemove}>
          <AppIcon name="close" size={16} color={colors.primary} />
        </Pressable>
      )}
    </View>
  );
}
