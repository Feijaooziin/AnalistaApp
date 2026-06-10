import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import { usersJbsRepository } from "@/src/database/repositories/usersJbsRepository";
import { User } from "@/src/types/user";

import { useTheme } from "@/src/contexts/ThemeContext";
import { SPACING } from "@/src/theme/layout";

import ScreenContainer from "@/src/components/layout/ScreenContainer";
import { PickerInput } from "@/src/components/PickerInput";
import AppButton from "@/src/components/ui/AppButton";
import AppInput from "@/src/components/ui/AppInput";
import { useRefresh } from "@/src/hooks/useRefresh";
import FuncionarioCard from "@/src/modules/jbs/components/FuncionarioCard";
import { JBS_CARGOS_FILTER } from "@/src/modules/jbs/constants/jbs";
import { exportDatabase } from "@/src/services/backup/exportDatabase";
import { importDatabase } from "@/src/services/backup/importDatabase";

export default function Funcionarios() {
  const { colors } = useTheme();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [cargoFilter, setCargoFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const filteredUsers = users.filter((user) => {
    const term = search.toLowerCase();

    const matchesSearch =
      user.nome.toLowerCase().includes(term) ||
      user.matricula?.toLowerCase().includes(term);

    const matchesCargo = cargoFilter === "Todos" || user.cargo === cargoFilter;

    return matchesSearch && matchesCargo;
  });

  async function loadUsers() {
    setLoading(true);

    const data = await usersJbsRepository.list();

    setUsers(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function handleImport() {
    try {
      await importDatabase();

      await loadUsers();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleExport() {
    await exportDatabase();
  }

  useRefresh("usersJbs", loadUsers);

  function goToDetails(id?: number) {
    if (!id) return;

    router.push(`/jbs/funcionarios/${id}` as any);
  }

  return (
    <ScreenContainer scrollable={false} header={{ title: "Funcionários" }}>
      <View style={{ marginTop: SPACING.lg }}>
        <AppInput
          placeholder="Pesquisar funcionário..."
          value={search}
          onChangeText={setSearch}
        />
        <PickerInput
          label="Cargo"
          value={cargoFilter}
          onValueChange={setCargoFilter}
          options={JBS_CARGOS_FILTER}
        />
        <Text
          style={{
            color: colors.textSecondary,
            marginBottom: SPACING.xxl,
          }}
        >
          {filteredUsers.length} funcionário(s)
        </Text>

        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{
            paddingBottom: 120,
            gap: SPACING.sm,
          }}
          renderItem={({ item }) => (
            <FuncionarioCard user={item} onPress={() => goToDetails(item.id)} />
          )}
        />
      </View>

      <View style={{ gap: SPACING.lg }}>
        <AppButton
          title="Exportar Backup"
          leftIcon="cloud-upload-outline"
          onPress={handleExport}
        />
        <AppButton
          title="Importar Backup"
          leftIcon="cloud-download-outline"
          onPress={handleImport}
        />
      </View>

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
        <Ionicons name="person-add-outline" size={28} color="#fff" />
      </TouchableOpacity>
    </ScreenContainer>
  );
}
