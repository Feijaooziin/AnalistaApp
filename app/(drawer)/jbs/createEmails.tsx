import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Linking, Text, View } from "react-native";

import AppButton from "@/src/components/AppButton";
import AppCard from "@/src/components/AppCard";
import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";
import { useTheme } from "@/src/contexts/ThemeContext";
import {
  EMAIL_OPTIONS,
  EMAIL_SUBJECT,
  EMAIL_TO,
} from "@/src/modules/jbs/constants/email";
import { FONT_SIZE, ICON_SIZE, SPACING } from "@/src/theme/layout";

export default function CreateEmails() {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<string[]>([]);
  const selectedCount = selected.length;

  function toggleItem(item: string) {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  }

  async function handleSend() {
    const body = `
Itens selecionados:

${selected.join("\n")}

Enviado pelo Analista App
`;

    const url =
      `mailto:${EMAIL_TO}` +
      `?subject=${encodeURIComponent(EMAIL_SUBJECT)}` +
      `&body=${encodeURIComponent(body)}`;

    await Linking.openURL(url);
  }

  return (
    <ScreenContainer header={{ title: "Criar Emails", toggleTheme: true }}>
      <PageContext title="Criar Emails Operacionais" />
      <Text
        style={{
          marginBottom: 16,
          color: colors.textSecondary,
        }}
      >
        {selectedCount} item(ns) selecionado(s)
      </Text>

      <View style={{ gap: SPACING.sm, marginBottom: SPACING.xxl }}>
        {EMAIL_OPTIONS.map((item) => {
          const checked = selected.includes(item);

          return (
            <AppCard
              key={item}
              onPress={() => toggleItem(item)}
              style={{
                borderWidth: 1,
                borderColor: checked ? colors.text : colors.border,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: colors.text, fontSize: FONT_SIZE.xl }}>
                  {item}
                </Text>

                <Ionicons
                  name={checked ? "checkbox" : "square-outline"}
                  size={ICON_SIZE.lg}
                  color={colors.text}
                />
              </View>
            </AppCard>
          );
        })}
      </View>

      <AppButton
        title="Enviar Email"
        leftIcon="mail-outline"
        disabled={selected.length === 0}
        onPress={handleSend}
      />
    </ScreenContainer>
  );
}
