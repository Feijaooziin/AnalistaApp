import { Linking, Text, View } from "react-native";

import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";

import AppCard from "@/src/components/ui/AppCard";

import { useTheme } from "@/src/contexts/ThemeContext";
import { SPACING } from "@/src/theme/layout";

export default function About() {
  const { colors } = useTheme();

  return (
    <ScreenContainer header={{ title: "Sobre", toggleTheme: true }}>
      <PageContext
        title="ECLA Hub"
        subtitle="Central de ferramentas operacionais desenvolvida pela ECLA."
      />
      <View
        style={{
          gap: SPACING.md,
        }}
      >
        <AppCard title="Versão" value="1.0.0" />

        <AppCard title="Desenvolvedor" value="Leonardo Victor" />

        <AppCard title="Descrição">
          <Text
            style={{
              color: colors.text,
              lineHeight: 22,
            }}
          >
            Aplicativo desenvolvido para auxiliar atividades operacionais,
            administrativas e de gestão do dia a dia.
          </Text>
        </AppCard>

        <AppCard title="Funcionalidades">
          <Text style={{ color: colors.text }}>• Gestão de Funcionários</Text>
          <Text style={{ color: colors.text }}>• Backup e Restauração</Text>
          <Text style={{ color: colors.text }}>• Quick Email</Text>
          <Text style={{ color: colors.text }}>• Advertências</Text>
          <Text style={{ color: colors.text }}>• Relatórios Operacionais</Text>
        </AppCard>

        <AppCard title="Tecnologias">
          <Text style={{ color: colors.text }}>React Native</Text>
          <Text style={{ color: colors.text }}>Expo</Text>
          <Text style={{ color: colors.text }}>SQLite</Text>
          <Text style={{ color: colors.text }}>TypeScript</Text>
        </AppCard>

        <AppCard
          title="Contato"
          value="leonardo.santos@emergentcold.com"
          copyable
          onPress={() =>
            Linking.openURL("mailto:leonardo.santos@emergentcold.com")
          }
        />
      </View>
    </ScreenContainer>
  );
}
