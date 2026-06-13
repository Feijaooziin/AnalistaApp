import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { RADIUS, SPACING } from "@/src/theme/layout";
import AppSearchInput from "./AppSearchInput";

const { height } = Dimensions.get("window");

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

function SelectItem<T>({
  item,
  selected,
  onPress,
  colors,
}: {
  item: SelectOption<T>;
  selected: boolean;
  onPress: () => void;
  colors: any;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        padding: SPACING.md,
        borderWidth: 1,
        borderRadius: RADIUS.md,
        marginBottom: SPACING.sm,
        borderColor: selected ? colors.primary : colors.border,
        backgroundColor: selected ? colors.primary + "15" : colors.surface,
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

  const translateY = useRef(new Animated.Value(height)).current;

  const sheetHeight = height * 0.5;
  const showSearch = options.length > 3;

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;

    const lower = search.toLowerCase();

    return options.filter((item) => item.label.toLowerCase().includes(lower));
  }, [options, search]);

  useEffect(() => {
    if (visible) {
      translateY.setValue(height);

      Animated.timing(translateY, {
        toValue: height - sheetHeight,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleSelect = useCallback(
    (selectedValue: T) => {
      onSelect?.(selectedValue);
      onClose();
    },
    [onSelect, onClose],
  );

  const renderItem = useCallback(
    ({ item }: { item: SelectOption<T> }) => {
      const selected = item.value === value;

      return (
        <SelectItem
          item={item}
          selected={selected}
          colors={colors}
          onPress={() => handleSelect(item.value)}
        />
      );
    },
    [value, colors, handleSelect],
  );

  return (
    <Modal visible={visible} transparent animationType="none">
      {/* BACKDROP */}
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      />

      {/* SHEET */}
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: sheetHeight,
          backgroundColor: colors.background,
          borderTopLeftRadius: RADIUS.lg,
          borderTopRightRadius: RADIUS.lg,
          padding: SPACING.md,
          transform: [{ translateY }],
        }}
      >
        {/* HANDLE */}
        <View
          style={{
            width: 40,
            height: 5,
            backgroundColor: colors.border,
            borderRadius: 20,
            alignSelf: "center",
            marginBottom: SPACING.md,
          }}
        />

        {/* TITLE */}
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
          <AppSearchInput
            placeholder="Pesquisar..."
            value={search}
            onChangeText={setSearch}
          />
        )}

        {/* COUNT */}
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
        <FlatList
          data={filteredOptions}
          keyExtractor={(item) => String(item.value)}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        />

        {/* EMPTY */}
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
      </Animated.View>
    </Modal>
  );
}
