import { useState } from "react";
import { View } from "react-native";

import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";
import AppAlert from "@/src/components/ui/AppAlert";
import AppButton from "@/src/components/ui/AppButton";
import AppSectionCard from "@/src/components/ui/AppSectionCard";
import { useTheme } from "@/src/contexts/ThemeContext";
import { useAlert } from "@/src/hooks/useAlert";

export default function AlertsPlayground() {
  const { colors } = useTheme();
  const { showAlert } = useAlert();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [warning, setWarning] = useState(false);

  const [deleteAlert, setDeleteAlert] = useState(false);
  const [cancelAlert, setCancelAlert] = useState(false);
  const [finishAlert, setFinishAlert] = useState(false);

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
          subtitle="Validando UI e comportamento antes da integração."
        />

        <AppSectionCard
          title="Alertas simples"
          subtitle="Utilizados apenas para informar o usuário."
          collapsible
          defaultOpen
        >
          <AppButton
            title="Success"
            onPress={() =>
              showAlert({
                type: "success",
                title: "Salvo com sucesso",
                message: "As informações foram atualizadas.",
              })
            }
            style={{ backgroundColor: colors.success }}
          />

          <AppButton
            title="Error"
            onPress={() =>
              showAlert({
                type: "error",
                title: "Erro ao salvar",
                message: "Tente novamente mais tarde.",
              })
            }
            style={{ backgroundColor: colors.error }}
          />

          <AppButton
            title="Info"
            onPress={() =>
              showAlert({
                type: "info",
                title: "Informação",
                message: "Esta ação foi concluída.",
              })
            }
            style={{ backgroundColor: colors.info }}
          />

          <AppButton
            title="Warning"
            onPress={() =>
              showAlert({
                type: "warning",
                title: "Atenção",
                message: "Confira os dados antes de continuar.",
              })
            }
            style={{ backgroundColor: colors.warning }}
          />
        </AppSectionCard>

        <AppSectionCard
          title="Alertas com confirmação"
          subtitle="Utilizados antes de executar ações importantes."
          collapsible
          defaultOpen
        >
          <AppButton
            title="Excluir membro"
            style={{ backgroundColor: colors.error }}
            onPress={() => setDeleteAlert(true)}
          />

          <AppButton
            title="Cancelar operação"
            style={{ backgroundColor: colors.warning }}
            onPress={() => setCancelAlert(true)}
          />

          <AppButton
            title="Finalizar cadastro"
            style={{ backgroundColor: colors.success }}
            onPress={() => setFinishAlert(true)}
          />
        </AppSectionCard>

        {/* CONFIRM */}
        <AppAlert
          visible={deleteAlert}
          variant="confirm"
          type="error"
          title="Excluir membro?"
          message="Essa ação não poderá ser desfeita."
          confirmText="Excluir"
          cancelText="Cancelar"
          onClose={() => setDeleteAlert(false)}
        />

        <AppAlert
          visible={cancelAlert}
          variant="confirm"
          type="warning"
          title="Cancelar operação?"
          message="Os dados não salvos serão perdidos."
          confirmText="Continuar"
          cancelText="Voltar"
          onClose={() => setCancelAlert(false)}
        />

        <AppAlert
          visible={finishAlert}
          variant="confirm"
          type="success"
          title="Finalizar cadastro?"
          message="Após confirmar, o cadastro ficará disponível para uso."
          confirmText="Finalizar"
          cancelText="Revisar"
          onClose={() => setFinishAlert(false)}
        />
      </View>
    </ScreenContainer>
  );
}
