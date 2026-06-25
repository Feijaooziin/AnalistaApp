import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import { usersJbsRepository } from "@/src/database/repositories/usersJbsRepository";
import { User } from "@/src/types/user";

import { useTheme } from "@/src/contexts/ThemeContext";
import { ICON_SIZE, RADIUS, SPACING } from "@/src/theme/layout";

import ScreenContainer from "@/src/components/layout/ScreenContainer";
import AppButton from "@/src/components/ui/AppButton";
import AppInput from "@/src/components/ui/AppInput";
import AppPicker from "@/src/components/ui/AppPicker";
import AppSelectModal from "@/src/components/ui/AppSelectModal";
import { useRefresh } from "@/src/hooks/useRefresh";
import FuncionarioCard from "@/src/modules/jbs/components/FuncionarioCard";
import { JBS_CARGOS_FILTER } from "@/src/modules/jbs/constants/jbs";
import { exportDatabase } from "@/src/services/backup/exportDatabase";
import { importDatabase } from "@/src/services/backup/importDatabase";
import { confirmAlert } from "@/src/utils/alert";
import { showSuccess } from "@/src/utils/toast";

export default function Funcionarios() {
  const { colors } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
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

  useFocusEffect(
    useCallback(() => {
      loadUsers();
    }, []),
  );

  async function loadUsers() {
    setLoading(true);

    const data = await usersJbsRepository.list();

    setUsers(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useRefresh("usersJbs", loadUsers);

  function goToDetails(id?: number) {
    if (!id) return;

    router.push(`/jbs/funcionarios/${id}` as any);
  }

  async function handleImport() {
    try {
      setModalOpen(false);
      await importDatabase();
      await loadUsers();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleExport() {
    setModalOpen(false);
    await exportDatabase();
    await loadUsers();
  }

  async function handleClear() {
    setModalOpen(false);

    const firstConfirm = await confirmAlert({
      type: "warning",
      title: "Excluir funcionários",
      message: "Deseja realmente excluir todos os registros?",
      confirmText: "Excluir",
    });

    if (!firstConfirm) {
      setModalOpen(true);
      return;
    }

    const secondConfirm = await confirmAlert({
      type: "error",
      title: "Atenção máxima!",
      message:
        "Todos os funcionários cadastrados serão removidos permanentemente. Deseja continuar?",
    });

    if (!secondConfirm) {
      setModalOpen(true);
      return;
    }

    await usersJbsRepository.clear();
    await loadUsers();

    showSuccess(
      "Dados apagados",
      `${users.length} funcionários excluídos com sucesso.`,
    );
  }

  return (
    <ScreenContainer
      scrollable={false}
      header={{ title: "Funcionários", toggleTheme: true }}
    >
      <View style={{ flex: 1, marginTop: SPACING.lg }}>
        <AppInput
          placeholder="Pesquisar funcionário..."
          value={search}
          onChangeText={setSearch}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: SPACING.xs,
            gap: SPACING.sm,
          }}
        >
          <AppPicker
            style={{ flex: 1 }}
            label="Cargo"
            value={cargoFilter}
            onValueChange={setCargoFilter}
            options={JBS_CARGOS_FILTER}
          />

          <AppButton
            style={{ alignSelf: "flex-end" }}
            title="Opções"
            leftIcon="toggle-outline"
            onPress={() => setModalOpen(true)}
            size="sm"
          />
        </View>

        <Text
          style={{
            color: colors.textSecondary,
            marginBottom: SPACING.md,
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

      {/* FAB */}
      <TouchableOpacity
        onPress={() => router.push("/jbs/funcionarios/novo")}
        style={{
          position: "absolute",
          bottom: 48,
          right: 16,
          backgroundColor: colors.secondary,
          width: 60,
          height: 60,
          borderRadius: RADIUS.full,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="person-add-outline" size={ICON_SIZE.xxl} color="#fff" />
      </TouchableOpacity>

      <AppSelectModal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Selecionar opção"
      >
        {() => (
          <View style={{ gap: SPACING.sm }}>
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
            <AppButton
              title="Limpar lista"
              leftIcon="trash-outline"
              onPress={handleClear}
              variant="danger"
            />
          </View>
        )}
      </AppSelectModal>
    </ScreenContainer>
  );
}
