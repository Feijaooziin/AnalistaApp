import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";

import AppButton from "@/src/components/ui/AppButton";
import AppInput from "@/src/components/ui/AppInput";

import { useTheme } from "@/src/contexts/ThemeContext";
import { SPACING } from "@/src/theme/layout";

export default function NovoFuncionario() {
  const { colors } = useTheme();

  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    if (!nome.trim()) {
      setError("Nome é obrigatório");
      return;
    }

    try {
      setError(null);
      setLoading(true);

      // futuro: SQLite insert aqui
      console.log({ nome, matricula });

      setNome("");
      setMatricula("");

      router.back();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer>
      <PageContext title="Novo Funcionário" />

      <View style={{ gap: SPACING.sm }}>
        <AppInput
          label="Nome"
          value={nome}
          onChangeText={(t) => {
            setNome(t);
            if (error) setError(null);
          }}
          placeholder="Digite o nome"
          error={error || undefined}
        />

        <AppInput
          label="Matrícula"
          value={matricula}
          onChangeText={setMatricula}
          placeholder="Opcional"
        />

        <AppButton title="Salvar" loading={loading} onPress={handleCreate} />
      </View>
    </ScreenContainer>
  );
}
