import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, ICON_SIZE, SPACING } from "@/src/theme/layout";
import AppIcon from "../icons/AppIcon";

type Variant = "date" | "time" | "datetime" | "month" | "year" | "range";

interface Props {
  label: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;

  variant?: Variant;
  readonly?: boolean;
  format?: string;

  required?: boolean;
  error?: string;
  clearable?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function DateTimeInput({
  label,
  value,
  onChange,
  variant = "date",
  readonly = false,
  format,
  required,
  error,
  clearable = true,
  size,
}: Props) {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

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

  const currentSize = sizes[size ?? "md"];

  function handleOpen() {
    if (readonly) return;
    setIsOpen(true);
  }

  function handleChange(_: any, selectedDate?: Date) {
    setIsOpen(false);
    if (selectedDate) {
      onChange?.(selectedDate);
    }
  }

  function handleDismiss() {
    setIsOpen(false);
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

        {required && <Text style={{ color: colors.error }}>{" *"}</Text>}
      </Text>

      <Pressable
        onPress={handleOpen}
        style={{
          borderWidth: 1,
          borderColor: error ? colors.error : colors.border,
          borderRadius: 10,
          backgroundColor: readonly ? colors.background : colors.surface,

          padding: currentSize.padding,

          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",

          opacity: readonly ? 0.8 : 1,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <AppIcon
            name={getIcon()}
            size={currentSize.icon}
            color={value ? colors.text : colors.placeholder}
          />

          <Text
            style={{
              color: value ? colors.text : colors.placeholder,
              fontSize: currentSize.fontSize,
              fontWeight: value ? "900" : "400",
            }}
          >
            {formatValue()}
          </Text>
        </View>

        {clearable && value && (
          <Pressable onPress={() => onChange?.(null)}>
            <AppIcon
              name="close-circle-outline"
              size={currentSize.icon}
              color={colors.text}
            />
          </Pressable>
        )}
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

      {error && (
        <Text
          style={{
            color: colors.error,
            marginTop: 4,
            fontSize: 12,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
