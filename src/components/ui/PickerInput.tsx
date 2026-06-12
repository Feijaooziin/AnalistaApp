import { useTheme } from "@/src/contexts/ThemeContext";
import { RADIUS } from "@/src/theme/layout";
import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";

interface PickerOption<T = string> {
  label: string;
  value: T;
}

interface PickerInputProps<T = string> {
  label: string;
  value: T;
  options: PickerOption<T>[];
  onValueChange: (value: T) => void;
}

export function PickerInput<T extends string | number>({
  label,
  value,
  options,
  onValueChange,
}: PickerInputProps<T>) {
  const { colors } = useTheme();

  function handleValueChange(itemValue: unknown) {
    onValueChange(itemValue as T);
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
          color: colors.textSecondary,
          marginBottom: 6,
        }}
      >
        {label}
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: RADIUS.sm,
          overflow: "hidden",
          backgroundColor: colors.surface,
        }}
      >
        <Picker
          selectedValue={value}
          dropdownIconColor={colors.text}
          style={{
            color: colors.text,
            backgroundColor: colors.surface,
          }}
          onValueChange={handleValueChange}
        >
          {options.map(({ label, value }) => (
            <Picker.Item key={String(value)} label={label} value={value} />
          ))}
        </Picker>
      </View>
    </View>
  );
}
