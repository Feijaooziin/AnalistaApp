import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { usersJbsRepository } from "@/src/database/repositories/usersJbsRepository";
import { User } from "@/src/types/user";

import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, RADIUS, SPACING } from "@/src/theme/layout";

export default function FuncionarioDetalhe() {
  const { colors } = useTheme();

  const { id } = useLocalSearchParams<{ id: string }>();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    if (!id) return;

    setLoading(true);

    const data = await usersJbsRepository.findById(Number(id));

    setUser(data ?? null);

    setLoading(false);
  }

  useEffect(() => {
    loadUser();
  }, [id]);

  if (loading) {
    return (
      <ScreenContainer header={{ title: "Detalhes", variant: "back" }}>
        <Text style={{ color: colors.textSecondary }}>Carregando...</Text>
      </ScreenContainer>
    );
  }

  if (!user) {
    return (
      <ScreenContainer header={{ title: "Detalhes", variant: "back" }}>
        <Text style={{ color: colors.textSecondary }}>
          Funcionário não encontrado
        </Text>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer header={{ title: user.nome, variant: "back" }}>
      <PageContext title="Detalhes do Funcionário" />

      <View style={{ gap: SPACING.md }}>
        <View
          style={{
            backgroundColor: colors.surface,
            padding: SPACING.md,
            borderRadius: RADIUS.md,
          }}
        >
          <Text style={{ color: colors.textSecondary }}>Nome</Text>
          <Text style={{ fontSize: FONT_SIZE.md, color: colors.text }}>
            {user.nome}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.surface,
            padding: SPACING.md,
            borderRadius: RADIUS.md,
          }}
        >
          <Text style={{ color: colors.textSecondary }}>Matrícula</Text>
          <Text style={{ fontSize: FONT_SIZE.md, color: colors.text }}>
            {user.matricula ?? "-"}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.surface,
            padding: SPACING.md,
            borderRadius: RADIUS.md,
          }}
        >
          <Text style={{ color: colors.textSecondary }}>Cargo</Text>
          <Text style={{ fontSize: FONT_SIZE.md, color: colors.text }}>
            {user.cargo ?? "-"}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.surface,
            padding: SPACING.md,
            borderRadius: RADIUS.md,
          }}
        >
          <Text style={{ color: colors.textSecondary }}>Telefone</Text>
          <Text style={{ fontSize: FONT_SIZE.md, color: colors.text }}>
            {user.telefone ?? "-"}
          </Text>
        </View>

        {/* BOTÃO EDITAR (preparação futura) */}
        <TouchableOpacity
          // onPress={() => router.push(`/jbs/funcionarios/${id}/editar` as any)}
          style={{
            marginTop: SPACING.lg,
            backgroundColor: colors.primary,
            padding: SPACING.md,
            borderRadius: RADIUS.md,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            Editar funcionário
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}
