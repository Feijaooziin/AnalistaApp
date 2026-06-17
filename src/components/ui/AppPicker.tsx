import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, ICON_SIZE, RADIUS, SPACING } from "@/src/theme/layout";

import AppIcon from "../icons/AppIcon";
import AppSelectBottomSheet from "./AppSelectBottomSheet";
import AppSelectModal from "./AppSelectModal";

interface PickerOption<T = string> {
  label: string;
  value: T;
}

interface Props<T extends string | number = string> {
  label: string;
  value?: T | null;
  options: PickerOption<T>[];
  onValueChange?: (value: T) => void;
  modalTitle?: boolean;
  required?: boolean;
  readonly?: boolean;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  type?: "modal" | "bottomSheet";
  initialSnap?: number;
  expandedSnap?: number;
  style?: StyleProp<ViewStyle>;
}

export default function AppPicker<T extends string | number>({
  label,
  value,
  options,
  onValueChange,
  modalTitle = false,
  required,
  readonly,
  placeholder = "Selecione uma opção",
  size = "md",
  type = "modal",
  initialSnap,
  expandedSnap,
  style,
}: Props<T>) {
  const { colors } = useTheme();

  const [open, setOpen] = useState(false);

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

  const currentSize = sizes[size];

  const selectedOption = useMemo(
    () => options.find((item) => item.value === value),
    [options, value],
  );

  const handleSelect = (selectedValue: T) => {
    onValueChange?.(selectedValue);
    setOpen(false);
  };

  return (
    <>
      <View style={style}>
        <Text
          style={{
            fontSize: currentSize.fontSize,
            fontWeight: "600",
            color: colors.textSecondary,
            marginBottom: SPACING.sm,
          }}
        >
          {label}

          {required && <Text style={{ color: colors.error }}>{" *"}</Text>}
        </Text>

        <Pressable
          onPress={readonly ? undefined : () => setOpen(true)}
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 10,
            backgroundColor: readonly ? colors.background : colors.surface,
            padding: currentSize.padding,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            opacity: readonly ? 0.8 : 1,
          }}
        >
          <Text
            style={{
              color: selectedOption ? colors.text : colors.placeholder,
              fontSize: currentSize.fontSize,
              fontWeight: selectedOption ? "600" : "400",
            }}
          >
            {selectedOption?.label ?? placeholder}
          </Text>

          <AppIcon
            name={open ? "chevron-up" : "chevron-down"}
            size={currentSize.icon}
            color={colors.textSecondary}
          />
        </Pressable>
      </View>

      {type === "bottomSheet" ? (
        <AppSelectBottomSheet
          visible={open}
          title={modalTitle ? `Selecionar ${label}` : undefined}
          value={value}
          options={options}
          onClose={() => setOpen(false)}
          onSelect={handleSelect}
          initialSnap={initialSnap}
          expandedSnap={expandedSnap}
        />
      ) : (
        <AppSelectModal
          visible={open}
          title={modalTitle ? `Selecionar ${label}` : undefined}
          onClose={() => setOpen(false)}
        >
          {(close) => (
            <FlatList
              data={options}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item }) => {
                const selected = item.value === value;

                return (
                  <Pressable
                    onPress={() => {
                      handleSelect(item.value);
                      close();
                    }}
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
          )}
        </AppSelectModal>
      )}
    </>
  );
}
