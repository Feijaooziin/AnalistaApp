import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";

import AppButton from "@/src/components/ui/AppButton";
import AppInput from "@/src/components/ui/AppInput";

import { usersJbsRepository } from "@/src/database/repositories/usersJbsRepository";

import { PickerInput } from "@/src/components/PickerInput";
import { JBS_CARGOS, JBS_ESCALAS } from "@/src/constants/jbs";
import { SPACING } from "@/src/theme/layout";

export default function NovoFuncionario() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    nome: "",
    matricula: "",
    cargo: "Auxiliar de operações",
    escala: "SEG / SEX - 20H / 05H",
    endereco: "",
    email: "",
    telefone: "",
  });

  function updateField(field: string, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (error) setError(null);
  }

  async function handleCreate() {
    if (!form.nome.trim()) {
      setError("Nome é obrigatório");
      return;
    }

    try {
      setLoading(true);

      await usersJbsRepository.create({
        nome: form.nome,
        matricula: form.matricula || null,
        cargo: form.cargo || null,
        escala: form.escala || null,
        endereco: form.endereco || null,
        email: form.email || null,
        telefone: form.telefone || null,
      });

      router.back();
    } catch (err) {
      console.log("Erro ao criar usuário:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer header={{ title: "Adicionar", variant: "back" }}>
      <PageContext title="Novo Funcionário" />

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
          value={form.matricula}
          onChangeText={(v) => updateField("matricula", v)}
          placeholder="Opcional"
        />

        <PickerInput
          label="Cargo"
          value={form.cargo}
          options={JBS_CARGOS}
          onValueChange={(v) => updateField("cargo", v)}
        />

        <PickerInput
          label="Escala"
          value={form.escala}
          options={JBS_ESCALAS}
          onValueChange={(v) => updateField("escala", v)}
        />

        <AppInput
          label="Endereço"
          value={form.endereco}
          onChangeText={(v) => updateField("endereco", v)}
          placeholder="Opcional"
        />

        <AppInput
          label="E-mail"
          value={form.email}
          onChangeText={(v) => updateField("email", v)}
          placeholder="Opcional"
          keyboardType="email-address"
        />

        <AppInput
          label="Telefone"
          value={form.telefone}
          onChangeText={(v) => updateField("telefone", v)}
          placeholder="Opcional"
          keyboardType="phone-pad"
        />

        <AppButton
          title="Salvar funcionário"
          loading={loading}
          onPress={handleCreate}
        />
      </View>
    </ScreenContainer>
  );
}
