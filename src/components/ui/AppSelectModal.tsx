import { useCallback, useMemo, useState } from "react";
import { FlatList, Pressable, Text } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { RADIUS, SPACING } from "@/src/theme/layout";

import AppBottomSheet from "./AppBottomSheet";
import AppSearchInput from "./AppSearchInput";

interface SelectOption<T = string> {
  label: string;
  value: T;
}

interface Props<T = string> {
  visible: boolean;
  title?: string;
  value?: T | null;
  options: SelectOption<T>[];
  onSelect?: (value: T) => void;
  onClose: () => void;
}

export default function AppSelectModal<T extends string | number>({
  visible,
  title,
  value,
  options,
  onSelect,
  onClose,
}: Props<T>) {
  const { colors } = useTheme();

  const [search, setSearch] = useState("");

  const showSearch = options.length > 3;

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;

    const lower = search.toLowerCase();

    return options.filter((item) => item.label.toLowerCase().includes(lower));
  }, [options, search]);

  const handleSelect = useCallback(
    (selectedValue: T) => {
      onSelect?.(selectedValue);
      onClose();
    },
    [onSelect, onClose],
  );

  return (
    <AppBottomSheet visible={visible} onClose={onClose} heightRatio={0.6}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: colors.text,
          marginBottom: SPACING.md,
        }}
      >
        {title ?? "Selecionar opção"}
      </Text>

      {showSearch && (
        <>
          <AppSearchInput
            placeholder="Pesquisar..."
            value={search}
            onChangeText={setSearch}
          />

          <Text
            style={{
              color: colors.textSecondary,
              marginTop: -10,
              marginBottom: SPACING.sm,
            }}
          >
            {filteredOptions.length} opções
          </Text>
        </>
      )}

      <FlatList
        data={filteredOptions}
        keyExtractor={(item) => String(item.value)}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const selected = item.value === value;

          return (
            <Pressable
              onPress={() => handleSelect(item.value)}
              style={{
                padding: SPACING.md,
                borderWidth: 1,
                borderRadius: RADIUS.md,
                marginBottom: SPACING.sm,
                borderColor: selected
                  ? colors.inputBorderFocused
                  : colors.border,
                backgroundColor: selected
                  ? colors.primary + "15"
                  : colors.surface,
              }}
            >
              <Text
                style={{
                  color: selected ? colors.text : colors.textSecondary,
                  fontWeight: selected ? "700" : "400",
                }}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        }}
      />

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
    </AppBottomSheet>
  );
}
