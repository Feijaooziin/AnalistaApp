import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Text, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, ICON_SIZE, SPACING } from "@/src/theme/layout";

interface PickerOption<T = string> {
  label: string;
  value: T;
}

interface PickerInputProps<T = string> {
  label: string;

  value: T | null;
  options: PickerOption<T>[];

  onPress?: () => void;

  required?: boolean;
  readonly?: boolean;
  placeholder?: string;

  size?: "sm" | "md" | "lg";
}

export default function PickerInput<T extends string | number>({
  label,
  value,
  options,
  onPress,
  required,
  readonly,
  placeholder = "Selecione uma opção",
  size = "md",
}: PickerInputProps<T>) {
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

  const selectedOption = options.find((item) => item.value === value);

  return (
    <View style={{ marginBottom: SPACING.md }}>
      <Text
        style={{
          fontSize: currentSize.fontSize,
          fontWeight: "600",
          color: colors.textSecondary,
          marginBottom: 6,
        }}
      >
        {label}

        {required && <Text style={{ color: colors.error }}>{" *"}</Text>}
      </Text>

      <Pressable
        onPress={readonly ? undefined : onPress}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 10,
          backgroundColor: readonly ? colors.background : colors.surface,

          padding: currentSize.padding,

          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",

          opacity: readonly ? 0.8 : 1,
        }}
      >
        <Text
          style={{
            color: selectedOption ? colors.text : colors.placeholder,

            fontSize: currentSize.fontSize,
            fontWeight: selectedOption ? "600" : "400",
          }}
        >
          {selectedOption?.label ?? placeholder}
        </Text>

        <Ionicons
          name="chevron-down"
          size={currentSize.icon}
          color={colors.textSecondary}
        />
      </Pressable>
    </View>
  );
}
