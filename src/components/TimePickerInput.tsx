import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, ICON_SIZE } from "../theme/layout";

interface Props {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
}

export default function TimePickerInput({ label, value, onChange }: Props) {
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
      onChange(selectedDate);
    }
  }

  const formattedTime = value
    ? value.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Selecionar horário";

  return (
    <View style={{ marginBottom: 16 }}>
      {/* LABEL */}
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

      {/* INPUT BUTTON */}
      <Pressable
        onPress={handleOpen}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 10,
          backgroundColor: colors.surface,
          padding: 12,

          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Ionicons
          name="time-outline"
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
          {formattedTime}
        </Text>
      </Pressable>

      {/* PICKER */}
      {isOpen && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onValueChange={handleChange}
          onDismiss={handleDismiss}
        />
      )}
    </View>
  );
}
