import { View } from "react-native";

import ScreenContainer from "@/src/components/layout/ScreenContainer";
import AppButton from "@/src/components/ui/AppButton";
import AppSectionCard from "@/src/components/ui/AppSectionCard";

import { SPACING } from "@/src/theme/layout";

export default function SettingsScreen() {
  return (
    <ScreenContainer
      header={{
        title: "Configurações",
        toggleTheme: true,
      }}
    >
      <View style={{ gap: SPACING.sm }}>
        <AppSectionCard
          title="Contrato"
          subtitle="Informações do seu contrato de trabalho"
          collapsible
          defaultOpen
        >
          <AppButton
            title="Configurar contrato"
            leftIcon="briefcase-outline"
            variant="outline"
          />
        </AppSectionCard>

        <AppSectionCard
          title="Aparência"
          subtitle="Personalize a aparência do aplicativo"
          collapsible
        >
          <AppButton
            title="Configurações de aparência"
            leftIcon="color-palette-outline"
            variant="outline"
          />
        </AppSectionCard>

        <AppSectionCard
          title="Aplicativo"
          subtitle="Preferências gerais do aplicativo"
          collapsible
        >
          <AppButton
            title="Configurações do aplicativo"
            leftIcon="settings-outline"
            variant="outline"
          />
        </AppSectionCard>
      </View>
    </ScreenContainer>
  );
}
