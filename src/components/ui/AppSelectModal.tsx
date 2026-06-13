import { useMemo, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

import AppInput from "@/src/components/ui/AppInput";
import { useTheme } from "@/src/contexts/ThemeContext";
import { RADIUS, SPACING } from "@/src/theme/layout";

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

    return options.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search]);

  function handleSelect(selectedValue: T) {
    onSelect?.(selectedValue);
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: "#00000060",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: colors.background,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: SPACING.md,
            maxHeight: "85%",
          }}
        >
          {/* HEADER */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: colors.text,
              marginBottom: SPACING.sm,
            }}
          >
            {title ?? "Selecionar opção"}
          </Text>

          {/* SEARCH */}
          {showSearch && (
            <AppInput
              placeholder="Pesquisar..."
              value={search}
              onChangeText={setSearch}
            />
          )}

          {showSearch && (
            <Text
              style={{
                color: colors.textSecondary,
                marginTop: -10,
                marginBottom: 10,
              }}
            >
              {filteredOptions.length} opções
            </Text>
          )}

          {/* LIST */}
          <View style={{ gap: SPACING.sm }}>
            {filteredOptions.map((option) => {
              const selected = option.value === value;

              return (
                <Pressable
                  key={String(option.value)}
                  onPress={() => handleSelect(option.value)}
                  style={{
                    padding: SPACING.md,
                    borderWidth: 1,
                    borderRadius: RADIUS.md,
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
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}

            {/* EMPTY STATE */}
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
        </View>
      </View>
    </Modal>
  );
}
