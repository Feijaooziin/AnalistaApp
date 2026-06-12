import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, ICON_SIZE } from "@/src/theme/layout";

type Variant = "date" | "time" | "datetime" | "month" | "year" | "range";

interface Props {
  label: string;

  value?: Date | null;

  onChange?: (date: Date) => void;

  variant?: Variant;

  readonly?: boolean;

  format?: string;
}

export default function DateTimeInput({
  label,
  value,
  onChange,

  variant = "date",

  readonly = false,

  format,
}: Props) {
  const { colors } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    if (readonly) return;
    setIsOpen(true);
  }

  function handleDismiss() {
    setIsOpen(false);
  }

  function handleChange(_: any, selectedDate?: Date) {
    setIsOpen(false);

    if (selectedDate) {
      onChange?.(selectedDate);
    }
  }

  function getMode(): "date" | "time" {
    switch (variant) {
      case "time":
        return "time";

      default:
        return "date";
    }
  }

  function getIcon() {
    switch (variant) {
      case "time":
        return "time-outline";

      case "datetime":
        return "calendar-clear-outline";

      case "month":
        return "calendar-number-outline";

      case "year":
        return "calendar-outline";

      case "range":
        return "swap-horizontal-outline";

      default:
        return "calendar-outline";
    }
  }

  function formatValue() {
    if (!value) {
      switch (variant) {
        case "time":
          return "Selecionar horário";

        case "datetime":
          return "Selecionar data e hora";

        case "month":
          return "Selecionar mês";

        case "year":
          return "Selecionar ano";

        case "range":
          return "Selecionar período";

        default:
          return "Selecionar data";
      }
    }

    if (format) {
      switch (format) {
        case "dd/MM/yyyy":
          return value.toLocaleDateString("pt-BR");

        case "HH:mm":
          return value.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          });

        case "MMMM/yyyy":
          return value.toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric",
          });

        case "yyyy":
          return String(value.getFullYear());

        default:
          return value.toLocaleDateString("pt-BR");
      }
    }

    switch (variant) {
      case "time":
        return value.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });

      case "datetime":
        return (
          value.toLocaleDateString("pt-BR") +
          " " +
          value.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })
        );

      case "month":
        return value.toLocaleDateString("pt-BR", {
          month: "long",
          year: "numeric",
        });

      case "year":
        return String(value.getFullYear());

      default:
        return value.toLocaleDateString("pt-BR");
    }
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
        onPress={handleOpen}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 10,
          backgroundColor: readonly ? colors.background : colors.surface,

          padding: 12,

          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",

          gap: 10,

          opacity: readonly ? 0.8 : 1,
        }}
      >
        <Ionicons
          name={getIcon()}
          size={ICON_SIZE.md}
          color={colors.textSecondary}
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
          mode={getMode()}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onValueChange={handleChange}
          onDismiss={handleDismiss}
        />
      )}
    </View>
  );
}
