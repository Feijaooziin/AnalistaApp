import { Dispatch, SetStateAction } from "react";
import { ScrollView } from "react-native";

import { AdvertenciaData } from "../types/advertencia";
import { motivosAdvertencia } from "../data/motivos";

import { Input } from "./Input";
import { PickerInput } from "./PickerInput";
import { DatePickerInput } from "./DatePickerInput";
import { MotivosSelector } from "./MotivosSelector";

interface Props {
  data: AdvertenciaData;
  setData: Dispatch<SetStateAction<AdvertenciaData>>;
  errors: Record<string, string>;
  clearError: (field: string) => void;
}

export function AdvertenciaForm({ data, setData, errors, clearError }: Props) {
  function updateField<K extends keyof AdvertenciaData>(
    field: K,
    value: AdvertenciaData[K],
  ) {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Input
        label="Funcionário"
        required
        error={errors.funcionario}
        value={data.funcionario}
        placeholder="Nome completo do funcionário"
        onChangeText={(text) => {
          updateField("funcionario", text);
          clearError("funcionario");
        }}
      />

      <DatePickerInput
        label="Data de Admissão"
        value={data.admissao}
        onChange={(date) => updateField("admissao", date)}
      />

      <PickerInput
        label="Tipo de Documento"
        value={data.tipoDocumento}
        options={[
          {
            label: "Advertência",
            value: "ADVERTENCIA",
          },
          {
            label: "Suspensão",
            value: "SUSPENSAO",
          },
        ]}
        onValueChange={(value) => updateField("tipoDocumento", value)}
      />

      <PickerInput
        label="Número"
        value={data.numeroAdvertencia}
        options={[
          {
            label: "1ª Advertência",
            value: 1,
          },
          {
            label: "2ª Advertência",
            value: 2,
          },
          {
            label: "3ª Advertência",
            value: 3,
          },
        ]}
        onValueChange={(value) => updateField("numeroAdvertencia", value)}
      />

      <MotivosSelector
        required
        error={errors.motivos}
        motivos={motivosAdvertencia}
        selecionados={data.motivos}
        onChange={(motivos) => {
          updateField("motivos", motivos);
          clearError("motivos");
        }}
      />

      <DatePickerInput
        label="Data do Ocorrido"
        value={data.dataOcorrido}
        onChange={(date) => updateField("dataOcorrido", date)}
      />

      <DatePickerInput
        label="Data da Assinatura"
        value={data.dataAssinatura}
        onChange={(date) => updateField("dataAssinatura", date)}
      />

      <Input
        label="Observações"
        value={data.observacoes}
        placeholder="Informações adicionais (opcional)"
        multiline
        onChangeText={(text) => updateField("observacoes", text)}
      />

      <Input
        label="Cidade"
        value={data.cidade}
        placeholder="Cidade da assinatura"
        onChangeText={(text) => updateField("cidade", text)}
      />
    </ScrollView>
  );
}
