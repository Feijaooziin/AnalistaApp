import { useState } from "react";
import { Linking, Text, View } from "react-native";

import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";

import AppButton from "@/src/components/ui/AppButton";
import AppInput from "@/src/components/ui/AppInput";
import { useTheme } from "@/src/contexts/ThemeContext";
import { SPACING } from "@/src/theme/layout";
import { showWarning } from "@/src/utils/toast";

export default function QuickEmail() {
  const { colors } = useTheme();
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  async function handleSend() {
    if (!to.trim()) {
      showWarning("Destinatário obrigatório", "Informe ao menos um e-mail.");
      return;
    }

    if (!subject.trim()) {
      showWarning("Assunto obrigatório", "Informe o assunto.");
      return;
    }
    const url =
      `mailto:${to}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    await Linking.openURL(url);
  }

  return (
    <ScreenContainer header={{ title: "Email Rápido" }}>
      <PageContext title="Enviar E-mail" />

      <View style={{ gap: 16 }}>
        <AppInput
          label="Destinatários"
          placeholder="email1@empresa.com,email2@empresa.com"
          value={to}
          onChangeText={setTo}
        />

        <AppInput
          label="Assunto"
          placeholder="Digite o assunto"
          value={subject}
          onChangeText={setSubject}
        />

        <AppInput
          label="Mensagem"
          placeholder="Digite a mensagem..."
          value={body}
          onChangeText={setBody}
          multiline
          numberOfLines={6}
        />
        <Text
          style={{
            textAlign: "right",
            color: colors.textMuted,
          }}
        >
          {body.length} caracteres
        </Text>

        <AppButton
          title="Enviar E-mail"
          leftIcon="mail-outline"
          onPress={handleSend}
          disabled={!to.trim() || !subject.trim()}
          style={{ marginTop: SPACING.xxl }}
        />
      </View>
    </ScreenContainer>
  );
}
