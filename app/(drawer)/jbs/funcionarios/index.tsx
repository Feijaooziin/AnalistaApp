import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import { usersJbsRepository } from "@/src/database/repositories/usersJbsRepository";
import { User } from "@/src/types/user";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, RADIUS, SPACING } from "@/src/theme/layout";

import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";
import Section from "@/src/components/layout/Section";

export default function Funcionarios() {
  const { colors } = useTheme();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadUsers() {
    setLoading(true);

    const data = await usersJbsRepository.list();

    setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function goToDetails(id?: number) {
    if (!id) return;

    router.push(`/jbs/funcionarios/${id}` as any);
  }

  return (
    <ScreenContainer>
      <PageContext title="Funcionários JBS" />

      <Section>
        {loading ? (
          <Text style={{ color: colors.textSecondary }}>Carregando...</Text>
        ) : (
          <FlatList
            data={users}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{
              gap: SPACING.sm,
              paddingBottom: 100,
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => goToDetails(item.id)}
                style={{
                  backgroundColor: colors.surface,
                  padding: SPACING.md,
                  borderRadius: RADIUS.md,

                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: FONT_SIZE.md,
                      fontWeight: "600",
                      color: colors.text,
                    }}
                  >
                    {item.nome}
                  </Text>

                  <Text
                    style={{
                      fontSize: FONT_SIZE.sm,
                      color: colors.textSecondary,
                    }}
                  >
                    Matrícula: {item.matricula ?? "-"}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            )}
          />
        )}
      </Section>

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
