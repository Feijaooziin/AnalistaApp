import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, ICON_SIZE } from "@/src/theme/layout";

type Variant = "date" | "time";

interface Props {
  label: string;
  value?: Date | null;
  onChange?: (date: Date) => void;
  variant?: Variant;
  readonly?: boolean;
  placeholder?: string;
}

export default function DateTimeInput({
  label,
  value,
  onChange,
  variant = "date",
  readonly = false,
  placeholder,
}: Props) {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleDismiss() {
    setIsOpen(false);
  }

  function handleChange(_: unknown, selectedDate?: Date) {
    setIsOpen(false);

    if (selectedDate) {
      if (onChange) {
        onChange(selectedDate);
      }
    }
  }

  function getIcon() {
    return variant === "time" ? "time-outline" : "calendar-outline";
  }

  function getPlaceholder() {
    if (placeholder) return placeholder;

    return variant === "time" ? "Selecionar horário" : "Selecionar data";
  }

  function formatValue() {
    if (!value) {
      return getPlaceholder();
    }

    if (variant === "time") {
      return value.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return value.toLocaleDateString("pt-BR");
  }

  return (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: colors.textSecondary,
          marginBottom: 6,
        }}
      >
        {label}
      </Text>

      <Pressable
        disabled={readonly}
        onPress={handleOpen}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 10,
          backgroundColor: readonly ? `${colors.surface}CC` : colors.surface,
          padding: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          opacity: readonly ? 0.6 : 1,
        }}
      >
        <Ionicons
          name={getIcon()}
          size={ICON_SIZE.md}
          color={value ? colors.text : colors.placeholder}
        />

        <Text
          style={{
            color: value ? colors.text : colors.placeholder,
            fontSize: FONT_SIZE.xl,
            fontWeight: "500",
          }}
        >
          {formatValue()}
        </Text>
      </Pressable>

      {isOpen && (
        <DateTimePicker
          value={value ?? new Date()}
          mode={variant}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onValueChange={handleChange}
          onDismiss={handleDismiss}
        />
      )}
    </View>
  );
}
