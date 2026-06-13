import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

import ScreenContainer from "@/src/components/layout/ScreenContainer";
import { useTheme } from "@/src/contexts/ThemeContext";
import { usePickerStore } from "@/src/store/pickerStore";
import { RADIUS, SPACING } from "@/src/theme/layout";

export default function PickerScreen() {
  const { colors } = useTheme();
  const { title, value, options, onSelect, closePicker } = usePickerStore();

  function handleSelect(selectedValue: string) {
    onSelect?.(selectedValue);
    closePicker();
    router.back();
  }

  return (
    <ScreenContainer
      modal
      header={{
        title: `Selecionar ${title}`,
      }}
    >
      <View
        style={{
          gap: SPACING.sm,
        }}
      >
        {options.map((option) => {
          const selected = option.value === value;

          return (
            <Pressable
              key={option.value}
              onPress={() => handleSelect(option.value)}
              style={{
                padding: SPACING.md,
                borderWidth: 1,
                borderRadius: RADIUS.md,
                borderColor: selected
                  ? colors.inputBorderFocused
                  : colors.inputBorder,
                backgroundColor: selected
                  ? colors.secondary + "15"
                  : colors.surface,
              }}
            >
              <Text
                style={{
                  color: selected ? colors.text : colors.textSecondary,
                  fontWeight: selected ? "700" : "400",
                }}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScreenContainer>
  );
}
