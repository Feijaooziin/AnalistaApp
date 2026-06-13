import { useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

import AppBottomSheet from "./AppBottomSheet";
import AppSearchInput from "./AppSearchInput";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, SPACING } from "@/src/theme/layout";

export interface SelectOption<T = string> {
  label: string;
  value: T;
}

interface Props<T = string> {
  visible: boolean;
  title: string;
  options: SelectOption<T>[];
  value: T | null;
  onSelect: (value: T) => void;
  onClose: () => void;
  searchable?: boolean;
}

export default function AppSelectModal<T extends string | number>({
  visible,
  title,
  options,
  value,
  onSelect,
  onClose,
  searchable = true,
}: Props<T>) {
  const { colors } = useTheme();
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;

    return options.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, options]);

  function handleSelect(item: SelectOption<T>) {
    onSelect(item.value);
    onClose();
    setSearch("");
  }

  return (
    <AppBottomSheet visible={visible} onClose={onClose} heightRatio={0.7}>
      {/* HEADER */}
      <Text
        style={{
          fontSize: FONT_SIZE.lg,
          fontWeight: "700",
          color: colors.text,
          marginBottom: SPACING.sm,
        }}
      >
        {title}
      </Text>

      {/* SEARCH */}
      {searchable && (
        <AppSearchInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar..."
        />
      )}

      {/* LIST */}
      <FlatList
        data={filteredOptions}
        keyExtractor={(item) => String(item.value)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => {
          const isSelected = item.value === value;

          return (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={{
                paddingVertical: SPACING.md,
                paddingHorizontal: SPACING.sm,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: FONT_SIZE.md,
                  color: colors.text,
                  fontWeight: isSelected ? "700" : "400",
                }}
              >
                {item.label}
              </Text>

              {isSelected && (
                <Text
                  style={{
                    color: colors.primary,
                    fontWeight: "700",
                  }}
                >
                  ✓
                </Text>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </AppBottomSheet>
  );
}
