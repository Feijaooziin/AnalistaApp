import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";

import { useTheme } from "@/src/contexts/ThemeContext";
import { SPACING } from "@/src/theme/layout";

// futuramente vamos trocar por AppInput e AppButton
import { TextInput, TouchableOpacity } from "react-native";

export default function NovoFuncionario() {
  const { colors } = useTheme();

  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (!nome.trim()) return;

    try {
      setLoading(true);

      // aqui depois vamos conectar no SQLite
      console.log({ nome, matricula });

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

      <View style={{ gap: SPACING.md }}>
        <TextInput
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          style={{
            backgroundColor: colors.surface,
            padding: 14,
            borderRadius: 10,
            color: colors.text,
          }}
        />

        <TextInput
          placeholder="Matrícula"
          value={matricula}
          onChangeText={setMatricula}
          style={{
            backgroundColor: colors.surface,
            padding: 14,
            borderRadius: 10,
            color: colors.text,
          }}
        />

        <TouchableOpacity
          onPress={handleCreate}
          disabled={loading}
          style={{
            backgroundColor: colors.primary,
            padding: 14,
            borderRadius: 10,
            alignItems: "center",
            opacity: loading ? 0.6 : 1,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {loading ? "Salvando..." : "Salvar"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
