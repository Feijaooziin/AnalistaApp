import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

import { usersJbsRepository } from "@/src/database/repositories/usersJbsRepository";
import { User } from "@/src/types/user";

import { useTheme } from "@/src/contexts/ThemeContext";
import { SPACING } from "@/src/theme/layout";

import ScreenContainer from "@/src/components/layout/ScreenContainer";
import AppCard from "@/src/components/ui/AppCard";

export default function Funcionarios() {
  const { colors } = useTheme();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadUsers() {
    setLoading(true);

    const data = await usersJbsRepository.list();

    setUsers(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadUsers();
    }, []),
  );

  function goToDetails(id?: number) {
    if (!id) return;

    router.push(`/jbs/funcionarios/${id}` as any);
  }

  return (
    <ScreenContainer scrollable={false} header={{ title: "Funcionários" }}>
      <FlatList
        data={users ?? []}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{
          padding: SPACING.lg,
          paddingBottom: 120,
          gap: SPACING.sm,
        }}
        renderItem={({ item }) => (
          <AppCard onPress={() => goToDetails(item.id)}>
            <Text style={{ fontWeight: "600", color: colors.text }}>
              {item.nome}
            </Text>

            <Text style={{ color: colors.textSecondary }}>
              Matrícula: {item.matricula ?? "-"}
            </Text>
          </AppCard>
        )}
      />

      {/* FAB */}
      <TouchableOpacity
        onPress={() => router.push("/jbs/funcionarios/novo")}
        style={{
          position: "absolute",
          bottom: 30,
          right: 20,
          backgroundColor: colors.primary,
          width: 56,
          height: 56,
          borderRadius: 28,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </ScreenContainer>
  );
}
