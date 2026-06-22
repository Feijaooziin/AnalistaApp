import { useState } from "react";
import { Linking, Text, View } from "react-native";

import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";

import EmailPickerModal from "@/src/components/EmailPicker";
import AppButton from "@/src/components/ui/AppButton";
import AppChip from "@/src/components/ui/AppChip";
import AppInput from "@/src/components/ui/AppInput";

import AppSearchInput from "@/src/components/ui/AppSearchInput";
import { useTheme } from "@/src/contexts/ThemeContext";
import { SPACING } from "@/src/theme/layout";
import { showWarning } from "@/src/utils/toast";

export default function QuickEmail() {
  const { colors } = useTheme();

  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const [openPicker, setOpenPicker] = useState(false);

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

  function handleSelectEmails(emails: string[]) {
    setTo(emails.join(","));
  }

  return (
    <ScreenContainer header={{ title: "Email Rápido", toggleTheme: true }}>
      <PageContext title="Enviar E-mail" />

      <View style={{ gap: 16 }}>
        <AppSearchInput
          label="Destinatários"
          placeholder="email@empresa.com"
          value={to}
          onChangeText={setTo}
          clearable
        />

        {to.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: SPACING.sm,
              marginBottom: SPACING.md,
            }}
          >
            {to.split(",").map((email) => (
              <AppChip key={email} label={email} />
            ))}
          </View>
        )}

        <AppButton
          title="Selecionar contatos"
          leftIcon="people-outline"
          onPress={() => setOpenPicker(true)}
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

        <Text style={{ textAlign: "right", color: colors.textMuted }}>
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

      <EmailPickerModal
        visible={openPicker}
        onClose={() => setOpenPicker(false)}
        onConfirm={handleSelectEmails}
      />
    </ScreenContainer>
  );
}
