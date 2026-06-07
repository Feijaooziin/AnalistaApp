import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { Alert } from "react-native";

import { DatePickerInput } from "@/src/components/DatePickerInput";
import ScreenContainer from "@/src/components/layout/ScreenContainer";
import AppButton from "@/src/components/ui/AppButton";
import AppInput from "@/src/components/ui/AppInput";
import TimePicker from "@/src/modules/Status JBS/components/TimePicker";
import { showInfo } from "@/src/utils/toast";

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
    `*_Status expedição JBS_*
*Data da Operação:* ${formatDate(data)}
*Quantidade de carros:* ${carros}
*Peso Bruto:* ${pesoBruto}
*Volumes:* ${volumes}
*Final da Separação:* ${formatTime(separacao)}
*Final da Conferência:* ${formatTime(conferencia)}
*Final do Carregamento:* ${formatTime(carregamento)}`;

  const copiar = async () => {
    const msg = gerarMensagem();
    Clipboard.setStringAsync(msg);

    showInfo("Copiado!", "Texto copiado para a área de transferência.");
  };

  const reset = async () => {
    Alert.alert(
      "Limpar capos",
      "Tem certeza que deseja limpar todos os campos?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Limpar",
          style: "destructive",
          onPress: async () => {
            setData(null);
            setCarros("");
            setSeparacao(null);
            setConferencia(null);
            setCarregamento(null);
            setPesoBruto("");
            setVolumes("");
          },
        },
      ],
    );
  };

  return (
    <ScreenContainer header={{ title: "Status Operacional" }}>
      <DatePickerInput
        label="Data da operação"
        value={data as any}
        onChange={setData}
      />

      <AppInput
        label="Quantidade de veículos"
        keyboardType="numeric"
        value={carros}
        onChangeText={setCarros}
      />

      <AppInput
        label="Peso Bruto"
        keyboardType="numeric"
        value={pesoBruto}
        onChangeText={(text) => setPesoBruto(formatNumber(text))}
      />

      <AppInput
        label="Volumes"
        keyboardType="numeric"
        value={volumes}
        onChangeText={(text) => setVolumes(formatNumber(text))}
      />

      <TimePicker
        label="Final da Separação"
        value={separacao}
        onChange={setSeparacao}
      />
      <TimePicker
        label="Final da Conferência"
        value={conferencia}
        onChange={setConferencia}
      />
      <TimePicker
        label="Final do Carregamento"
        value={carregamento}
        onChange={setCarregamento}
      />

      <AppButton title="Copiar" leftIcon="copy" onPress={copiar} />

      <AppButton
        title="Limpar campos"
        leftIcon="trash-bin-outline"
        variant="danger"
        onPress={reset}
        style={{ marginTop: 12 }}
      />
    </ScreenContainer>
  );
}
