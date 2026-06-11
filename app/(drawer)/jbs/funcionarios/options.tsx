import ScreenContainer from "@/src/components/layout/ScreenContainer";
import AppButton from "@/src/components/ui/AppButton";
import { triggerRefresh } from "@/src/hooks/useRefresh";
import { exportDatabase } from "@/src/services/backup/exportDatabase";
import { importDatabase } from "@/src/services/backup/importDatabase";
import { SPACING } from "@/src/theme/layout";
import { View } from "react-native";

export default function funcionarios() {
  async function handleImport() {
    try {
      await importDatabase();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleExport() {
    await exportDatabase();
  }

  triggerRefresh("usersJbs");

  return (
    <ScreenContainer
      modal
      header={{
        title: "",
      }}
    >
      <View style={{ gap: SPACING.sm }}>
        <AppButton
          title="Exportar Backup"
          leftIcon="cloud-upload-outline"
          onPress={handleExport}
        />
        <AppButton
          title="Importar Backup"
          leftIcon="cloud-download-outline"
          onPress={handleImport}
        />
      </View>
    </ScreenContainer>
  );
}
