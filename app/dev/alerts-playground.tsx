import { View } from "react-native";

import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";
import AppAlert from "@/src/components/ui/AppAlert";
import AppButton from "@/src/components/ui/AppButton";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useState } from "react";

export default function AlertsPlayground() {
  const { colors } = useTheme();
  const [info, setInfo] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  return (
    <ScreenContainer
      header={{
        title: "Alerts Playground",
        variant: "back",
        toggleTheme: true,
      }}
    >
      <View style={{ gap: 12 }}>
        <PageContext
          title="Testes de Alerts"
          subtitle="Validando UI antes de integrar no fluxo"
        />

        <AppButton
          title="Abrir Success"
          onPress={() => setSuccess(true)}
          style={{ backgroundColor: colors.success }}
        />
        <AppAlert
          visible={success}
          type="success"
          title="Membro salvo"
          message="As informações foram atualizadas."
          onClose={() => setSuccess(false)}
        />

        <AppButton
          title="Abrir Error"
          onPress={() => setError(true)}
          style={{ backgroundColor: colors.error }}
        />
        <AppAlert
          visible={error}
          type="error"
          title="Erro ao salvar"
          message="Tente novamente mais tarde."
          onClose={() => setError(false)}
        />

        <AppButton
          title="Abrir Info"
          onPress={() => setInfo(true)}
          style={{ backgroundColor: colors.info }}
        />
        <AppAlert
          visible={info}
          type="info"
          title="Informação"
          message="Essa ação não poderá ser desfeita."
          onClose={() => setInfo(false)}
        />

        <AppButton
          title="Abrir Warning"
          onPress={() => setWarning(true)}
          style={{ backgroundColor: colors.warning }}
        />
        <AppAlert
          visible={warning}
          type="warning"
          title="Excluir membro"
          message="Essa ação não poderá ser desfeita."
          onClose={() => setWarning(false)}
        />
      </View>
    </ScreenContainer>
  );
}
