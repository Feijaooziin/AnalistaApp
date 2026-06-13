import { Text, TextInput, View } from "react-native";

import AppIcon from "@/src/components/icons/AppIcon";
import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, ICON_SIZE, RADIUS, SPACING } from "@/src/theme/layout";

interface Props {
  value: string;
  onChangeText?: (text: string) => void;
  label?: string;
  placeholder?: string;
  readonly?: boolean;
  clearable?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function AppSearchInput({
  value,
  onChangeText,
  label,
  placeholder = "Buscar...",
  readonly = false,
  clearable = true,
  size = "md",
}: Props) {
  const { colors } = useTheme();

  const sizes = {
    sm: {
      padding: SPACING.sm,
      fontSize: FONT_SIZE.sm,
      icon: ICON_SIZE.sm,
    },

    md: {
      padding: SPACING.md,
      fontSize: FONT_SIZE.md,
      icon: ICON_SIZE.md,
    },

    lg: {
      padding: SPACING.lg,
      fontSize: FONT_SIZE.xl,
      icon: ICON_SIZE.lg,
    },
  };

  const currentSize = sizes[size];

  function clear() {
    onChangeText?.("");
  }

  return (
    <View
      style={{
        marginBottom: SPACING.md,
      }}
    >
      {!!label && (
        <Text
          style={{
            marginBottom: 6,
            fontSize: currentSize.fontSize,
            fontWeight: "600",
            color: colors.textSecondary,
          }}
        >
          {label}
        </Text>
      )}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: RADIUS.sm,
          backgroundColor: readonly ? colors.background : colors.surface,
          paddingHorizontal: currentSize.padding,
          opacity: readonly ? 0.8 : 1,
        }}
      >
        <AppIcon
          name="search-outline"
          size={currentSize.icon}
          color={colors.textSecondary}
        />

        <TextInput
          value={value}
          editable={!readonly}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          style={{
            flex: 1,
            color: colors.text,
            fontSize: currentSize.fontSize,
            paddingVertical: currentSize.padding,
            marginLeft: 10,
          }}
        />

        {clearable && value.length > 0 && !readonly && (
          <AppIcon
            name="close-circle"
            size={currentSize.icon}
            color={colors.textSecondary}
            onPress={clear}
          />
        )}
      </View>
    </View>
  );
}
