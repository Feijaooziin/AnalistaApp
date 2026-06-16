import { useState } from "react";
import { View } from "react-native";

import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";
import AppAlert from "@/src/components/ui/AppAlert";
import AppButton from "@/src/components/ui/AppButton";
import AppSectionCard from "@/src/components/ui/AppSectionCard";
import { useTheme } from "@/src/contexts/ThemeContext";

export default function AlertsPlayground() {
  const { colors } = useTheme();

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
            onPress={() => setSuccess(true)}
            style={{ backgroundColor: colors.success }}
          />

          <AppButton
            title="Error"
            onPress={() => setError(true)}
            style={{ backgroundColor: colors.error }}
          />

          <AppButton
            title="Info"
            onPress={() => setInfo(true)}
            style={{ backgroundColor: colors.info }}
          />

          <AppButton
            title="Warning"
            onPress={() => setWarning(true)}
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

        {/* SIMPLE */}
        <AppAlert
          visible={success}
          type="success"
          title="Salvo com sucesso"
          message="As informações foram atualizadas."
          onClose={() => setSuccess(false)}
        />

        <AppAlert
          visible={error}
          type="error"
          title="Erro ao salvar"
          message="Tente novamente mais tarde."
          onClose={() => setError(false)}
        />

        <AppAlert
          visible={info}
          type="info"
          title="Informação"
          message="Esta ação foi concluída."
          onClose={() => setInfo(false)}
        />

        <AppAlert
          visible={warning}
          type="warning"
          title="Atenção"
          message="Confira os dados antes de continuar."
          onClose={() => setWarning(false)}
        />

        {/* CONFIRM */}
        <AppAlert
          visible={deleteAlert}
          variant="confirm"
          type="error"
          title="Excluir membro?"
          message="Essa ação não poderá ser desfeita."
          confirmText="Excluir"
          cancelText="Cancelar"
          onConfirm={() => {
            console.log("Membro excluído");
          }}
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
          onConfirm={() => {
            console.log("Operação cancelada");
          }}
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
          onConfirm={() => {
            console.log("Cadastro finalizado");
          }}
          onClose={() => setFinishAlert(false)}
        />
      </View>
    </ScreenContainer>
  );
}
