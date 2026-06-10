import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Linking, Text, View } from "react-native";

import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";
import AppButton from "@/src/components/ui/AppButton";
import AppCard from "@/src/components/ui/AppCard";
import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, ICON_SIZE, SPACING } from "@/src/theme/layout";

export default function CreateEmails() {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<string[]>([]);
  const EMAIL_OPTIONS = [
    "Cortes",
    "Madero",
    "Paletes",
    "Produtividade",
    "Cargas Paradas",
    "Processos Noturnos",
    "Fiboi CRT",
    "Outbound",
  ];

  const EMAIL_TO = "leonardo.santos@emergentcold.com";
  const EMAIL_SUBJECT = "Criar Emails";

  function toggleItem(item: string) {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  }

  async function handleSend() {
    const body = selected.join("\n");

    const url =
      `mailto:${EMAIL_TO}` +
      `?subject=${encodeURIComponent(EMAIL_SUBJECT)}` +
      `&body=${encodeURIComponent(body)}`;

    await Linking.openURL(url);
  }

  return (
    <ScreenContainer header={{ title: "Criar E-mail" }}>
      <PageContext title="Envio de E-mail" />
      <View style={{ gap: SPACING.sm, marginBottom: SPACING.xxl }}>
        {EMAIL_OPTIONS.map((item) => {
          const checked = selected.includes(item);

          return (
            <AppCard key={item} onPress={() => toggleItem(item)}>
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
        title="Enviar E-mail"
        leftIcon="mail-outline"
        onPress={handleSend}
      />
    </ScreenContainer>
  );
}
