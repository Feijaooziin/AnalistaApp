import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";

import AppInput from "@/src/components/AppInput";
import ScreenContainer from "@/src/components/layout/ScreenContainer";
import { useTheme } from "@/src/contexts/ThemeContext";
import { usePickerStore } from "@/src/store/pickerStore";
import { RADIUS, SPACING } from "@/src/theme/layout";

export default function PickerScreen() {
  const { colors } = useTheme();
  const { title, value, options, onSelect, closePicker } = usePickerStore();
  const [search, setSearch] = useState("");
  const showSearch = options.length > 3;

  const filteredOptions = useMemo(() => {
    if (!search.trim()) {
      return options;
    }

    return options.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search]);

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
        {showSearch && (
          <>
            <AppInput
              placeholder="Pesquisar..."
              value={search}
              onChangeText={setSearch}
              clearable
            />
            <Text
              style={{
                color: colors.textMuted,
                marginTop: -18,
                marginBottom: 6,
              }}
            >
              {filteredOptions.length} opções
            </Text>
          </>
        )}

        {filteredOptions.map((option) => {
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

        {filteredOptions.length === 0 && (
          <Text
            style={{
              textAlign: "center",
              color: colors.textSecondary,
              marginTop: SPACING.lg,
            }}
          >
            Nenhum resultado encontrado
          </Text>
        )}
      </View>
    </ScreenContainer>
  );
}
