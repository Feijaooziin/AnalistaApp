import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Text, View } from "react-native";

import { usersJbsRepository } from "@/src/database/repositories/usersJbsRepository";
import { User } from "@/src/types/user";

import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";

import AppButton from "@/src/components/ui/AppButton";
import AppCard from "@/src/components/ui/AppCard";
import { useTheme } from "@/src/contexts/ThemeContext";
import { SPACING } from "@/src/theme/layout";

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

  useFocusEffect(
    useCallback(() => {
      loadUser();
    }, [id]),
  );

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
        <AppCard title="Nome" value={user.nome} />
        <AppCard title="Matrícula" value={user.matricula ?? "-"} />
        <AppCard title="Cargo" value={user.cargo ?? "-"} />

        <AppButton
          title="Editar"
          leftIcon="create-outline"
          onPress={() => router.push(`/jbs/funcionarios/edit/${user.id}`)}
        />
      </View>
    </ScreenContainer>
  );
}
