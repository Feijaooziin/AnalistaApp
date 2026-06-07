import { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS } from "../constants/colors";

interface DatePickerInputProps {
  label: string;
  value?: Date;
  onChange: (date: Date) => void;
}

export function DatePickerInput({
  label,
  value,
  onChange,
}: DatePickerInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formattedDate = value
    ? value.toLocaleDateString("pt-BR")
    : "Selecione uma data";

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

  return (
    <View
      style={{
        marginBottom: 16,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: COLORS.primary,
          marginBottom: 6,
        }}
      >
        {label}
      </Text>

      <Pressable
        onPress={handleOpen}
        style={{
          borderWidth: 1,
          borderColor: COLORS.border,
          borderRadius: 10,
          backgroundColor: "#FFFFFF",
          padding: 12,
        }}
      >
        <Text
          style={{
            color: value ? COLORS.primary : COLORS.placeholder,
          }}
        >
          {formattedDate}
        </Text>
      </Pressable>

      {isOpen && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onValueChange={handleChange}
          onDismiss={handleDismiss}
        />
      )}
    </View>
  );
}
