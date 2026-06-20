import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

import AppIcon from "@/src/components/icons/AppIcon";
import AppButton from "@/src/components/ui/AppButton";
import AppModal from "@/src/components/ui/AppModal";

import { SAVED_EMAILS } from "@/src/constants/emails/savedEmails";
import { useTheme } from "@/src/contexts/ThemeContext";
import { SPACING } from "@/src/theme/layout";

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (emails: string[]) => void;
}

export default function EmailPickerModal({
  visible,
  onClose,
  onConfirm,
}: Props) {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(email: string) {
    setSelected((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email],
    );
  }

  function handleConfirm() {
    onConfirm(selected);
    setSelected([]);
    onClose();
  }

  return (
    <AppModal
      visible={visible}
      onClose={onClose}
      title="Selecionar destinatários"
    >
      <FlatList
        data={SAVED_EMAILS}
        keyExtractor={(item) => item.email}
        contentContainerStyle={{ gap: SPACING.sm }}
        renderItem={({ item }) => {
          const isSelected = selected.includes(item.email);

          return (
            <Pressable
              onPress={() => toggle(item.email)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: SPACING.md,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: isSelected ? colors.primary : colors.border,
                backgroundColor: isSelected
                  ? colors.primary + "15"
                  : colors.surface,
              }}
            >
              <View>
                <Text style={{ color: colors.text, fontWeight: "700" }}>
                  {item.name}
                </Text>
                <Text style={{ color: colors.textSecondary }}>
                  {item.email}
                </Text>
              </View>

              <AppIcon
                name={isSelected ? "checkbox" : "square-outline"}
                size={22}
                color={isSelected ? colors.primary : colors.textSecondary}
              />
            </Pressable>
          );
        }}
      />

      <View style={{ flexDirection: "row", gap: 12, marginTop: SPACING.md }}>
        <View style={{ flex: 1 }}>
          <AppButton title="Cancelar" variant="outline" onPress={onClose} />
        </View>

        <View style={{ flex: 1 }}>
          <AppButton title="Confirmar" onPress={handleConfirm} />
        </View>
      </View>
    </AppModal>
  );
}
