import { useState } from "react";
import { View } from "react-native";

import AppButton from "@/src/components/ui/AppButton";
import AppInput from "@/src/components/ui/AppInput";

import AppPicker from "@/src/components/ui/AppPicker";
import { JBS_CARGOS, JBS_ESCALAS } from "@/src/modules/jbs/constants/jbs";
import { FuncionarioFormData } from "@/src/modules/jbs/types/funcionarioForm";
import { SPACING } from "@/src/theme/layout";

interface Props {
  initialValues: FuncionarioFormData;

  buttonTitle: string;

  loading?: boolean;

  onSubmit: (data: FuncionarioFormData) => Promise<void>;
}

export default function FuncionarioForm({
  initialValues,
  buttonTitle,
  loading = false,
  onSubmit,
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FuncionarioFormData>(initialValues);

  function updateField(field: keyof FuncionarioFormData, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (error) setError(null);
  }

  async function handleSubmit() {
    if (!form.nome.trim()) {
      setError("Nome é obrigatório");
      return;
    }

    await onSubmit(form);
  }

  return (
    <View style={{ gap: SPACING.sm }}>
      <AppInput
        label="Nome"
        value={form.nome}
        onChangeText={(v) => updateField("nome", v)}
        placeholder="Nome completo"
        error={error || undefined}
      />

      <AppInput
        label="Matrícula"
        value={form.matricula || undefined}
        onChangeText={(v) => updateField("matricula", v)}
      />

      <AppPicker
        modalTitle
        label="Cargo"
        value={form.cargo}
        options={JBS_CARGOS}
        onValueChange={(v) => updateField("cargo", v)}
      />

      <AppPicker
        modalTitle
        label="Escala"
        value={form.escala}
        options={JBS_ESCALAS}
        onValueChange={(v) => updateField("escala", v)}
      />

      <AppInput
        label="Endereço"
        value={form.endereco}
        onChangeText={(v) => updateField("endereco", v)}
      />

      <AppInput
        label="E-mail"
        value={form.email}
        onChangeText={(v) => updateField("email", v)}
        keyboardType="email-address"
      />

      <AppInput
        label="Telefone"
        value={form.telefone}
        onChangeText={(v) => updateField("telefone", v)}
        keyboardType="phone-pad"
      />

      <AppButton title={buttonTitle} loading={loading} onPress={handleSubmit} />
    </View>
  );
}
