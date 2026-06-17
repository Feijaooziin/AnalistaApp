import * as Clipboard from "expo-clipboard";
import { useState } from "react";

import ScreenContainer from "@/src/components/layout/ScreenContainer";
import AppButton from "@/src/components/ui/AppButton";
import AppInput from "@/src/components/ui/AppInput";
import DateTimeInput from "@/src/components/ui/DateTimeInput";
import { SPACING } from "@/src/theme/layout";
import { showConfirmAlert } from "@/src/utils/alert";
import { showInfo, showSuccess } from "@/src/utils/toast";

export default function statusJBS() {
  const [data, setData] = useState<Date | null>(null);
  const [carros, setCarros] = useState("");
  const [separacao, setSeparacao] = useState<Date | null>(null);
  const [conferencia, setConferencia] = useState<Date | null>(null);
  const [carregamento, setCarregamento] = useState<Date | null>(null);
  const [pesoBruto, setPesoBruto] = useState("");
  const [volumes, setVolumes] = useState("");

  const formatTime = (d: Date | null) =>
    d ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";

  const formatDate = (d: Date | null) =>
    d ? d.toLocaleDateString("pt-BR") : "";

  function formatNumber(value: string) {
    const numeric = value.replace(/\D/g, "");

    if (!numeric) return "";

    return Number(numeric).toLocaleString("pt-BR");
  }

  const gerarMensagem = () =>
    `*_EXPEDIÇÃO JBS ${formatDate(data)}_*
*Quantidade de carros:* ${carros}
*Peso Bruto:* ${pesoBruto}
*Volumes:* ${volumes}
*Final da Separação:* ${formatTime(separacao)}
*Final da Conferência:* ${formatTime(conferencia)}
*Final do Carregamento:* ${formatTime(carregamento)}`;

  const copiar = async () => {
    const msg = gerarMensagem();
    Clipboard.setStringAsync(msg);

    showSuccess(
      "Copiado!",
      `Status de expedição ${formatDate(data)} copiado para a área de transferência.`,
    );
  };

  const reset = async () => {
    showConfirmAlert({
      type: "error",
      title: "Limpar campos?",
      message: "Isso apagará todas as informações preenchidas.",
      confirmText: "Limpar",
      onConfirm() {
        setData(null);
        setCarros("");
        setSeparacao(null);
        setConferencia(null);
        setCarregamento(null);
        setPesoBruto("");
        setVolumes("");
        showInfo("Limpar", "Todos os campos foram resetados.");
      },
    });
  };

  return (
    <ScreenContainer
      header={{ title: "Status Operacional", toggleTheme: true }}
    >
      <DateTimeInput
        label="Data da operação"
        value={data as any}
        onChange={setData}
        required
      />

      <AppInput
        label="Veículos"
        placeholder="Quantidade de Veículos"
        keyboardType="numeric"
        value={carros}
        onChangeText={setCarros}
      />

      <AppInput
        label="Peso Bruto"
        placeholder="Peso Expedido"
        keyboardType="numeric"
        value={pesoBruto}
        onChangeText={(text) => setPesoBruto(formatNumber(text))}
      />

      <AppInput
        label="Volumes"
        placeholder="Volumes Expedidos"
        keyboardType="numeric"
        value={volumes}
        onChangeText={(text) => setVolumes(formatNumber(text))}
      />

      <DateTimeInput
        label="Final da Separação"
        value={separacao}
        onChange={setSeparacao}
        variant="time"
      />

      <DateTimeInput
        label="Final da Conferência"
        value={conferencia}
        onChange={setConferencia}
        variant="time"
      />

      <DateTimeInput
        label="Final do Carregamento"
        value={carregamento}
        onChange={setCarregamento}
        variant="time"
      />

      <AppButton
        title="Limpar campos"
        variant="danger"
        size="sm"
        leftIcon="trash-bin-outline"
        onPress={reset}
        style={{ marginTop: SPACING.lg }}
      />

      <AppButton
        title="Copiar"
        disabled={formatDate(data) === ""}
        leftIcon="copy-outline"
        onPress={copiar}
        style={{ marginTop: SPACING.lg }}
      />
    </ScreenContainer>
  );
}
