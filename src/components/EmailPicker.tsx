import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

import AppIcon from "@/src/components/icons/AppIcon";
import AppButton from "@/src/components/ui/AppButton";
import AppModal from "@/src/components/ui/AppModal";

import AppChip from "@/src/components/ui/AppChip";
import { SAVED_EMAILS } from "@/src/constants/emails/savedEmails";
import { useTheme } from "@/src/contexts/ThemeContext";
import { SPACING } from "@/src/theme/layout";
import AppSearchInput from "./ui/AppSearchInput";

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
  const [search, setSearch] = useState("");

  function toggle(email: string) {
    setSelected((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email],
    );
  }

  function addManualEmail() {
    const email = search.trim().toLowerCase();

    const isValid = email.includes("@") && email.includes(".");

    if (!isValid) return;

    if (!selected.includes(email)) {
      setSelected((prev) => [...prev, email]);
    }

    setSearch("");
  }

  const filtered = useMemo(() => {
    const term = search.toLowerCase();

    return SAVED_EMAILS.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term),
    );
  }, [search]);

  function getLabel(email: string) {
    const found = SAVED_EMAILS.find((item) => item.email === email);

    return found?.name ?? email;
  }

  function handleConfirm() {
    onConfirm(selected);
    setSelected([]);
    setSearch("");
    onClose();
  }

  return (
    <AppModal visible={visible} onClose={onClose} title="Destinatários">
      {/* SEARCH INPUT */}
      <AppSearchInput
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar ou digitar email..."
      />

      {selected.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: SPACING.sm,
            marginBottom: SPACING.md,
          }}
        >
          {selected.map((email) => (
            <AppChip
              key={email}
              label={getLabel(email)}
              onRemove={() => toggle(email)}
            />
          ))}
        </View>
      )}

      {/* ADD MANUAL EMAIL */}
      {search.includes("@") && (
        <Pressable
          onPress={addManualEmail}
          style={{
            padding: SPACING.sm,
            marginBottom: SPACING.sm,
            backgroundColor: colors.primary + "20",
            borderRadius: 10,
          }}
        >
          <Text style={{ color: colors.primary, fontWeight: "600" }}>
            + Adicionar "{search}"
          </Text>
        </Pressable>
      )}

      {/* LIST */}
      <FlatList
        data={filtered}
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
                color={isSelected ? colors.text : colors.textMuted}
              />
            </Pressable>
          );
        }}
      />

      {/* ACTIONS */}
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
