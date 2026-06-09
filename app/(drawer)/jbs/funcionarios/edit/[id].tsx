import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";

import FuncionarioForm from "@/src/modules/jbs/FuncionarioForm";

import { usersJbsRepository } from "@/src/database/repositories/usersJbsRepository";
import { FuncionarioFormData } from "@/src/modules/jbs/types/funcionarioForm";
import { User } from "@/src/types/user";
import { showError, showSuccess } from "@/src/utils/toast";

export default function EditarFuncionario() {
  const { id } = useLocalSearchParams();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const data = await usersJbsRepository.findById(Number(id));

    if (data) {
      setUser(data);
    }
  }

  async function handleUpdate(data: FuncionarioFormData) {
    try {
      await usersJbsRepository.update({
        id: Number(id),

        nome: data.nome,
        matricula: data.matricula || undefined,
        cargo: data.cargo || undefined,
        escala: data.escala || undefined,
        endereco: data.endereco || undefined,
        email: data.email || undefined,
        telefone: data.telefone || undefined,
      });

      showSuccess(
        "Funcionário atualizado",
        "As alterações foram salvas com sucesso.",
      );

      setTimeout(() => {
        router.back();
      }, 300);
    } catch (error) {
      console.log(error);
      showError("Erro ao atualizar", "Não foi possível salvar as alterações.");
    }
  }

  if (!user) {
    return (
      <ScreenContainer>
        <PageContext title="Carregando..." />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer
      header={{
        title: "Editar",
        variant: "back",
      }}
    >
      <PageContext title="Editar Funcionário" />

      <FuncionarioForm
        buttonTitle="Salvar alterações"
        initialValues={{
          nome: user.nome ?? "",
          matricula: user.matricula ?? "",
          cargo: user.cargo ?? "",
          escala: user.escala ?? "",
          endereco: user.endereco ?? "",
          email: user.email ?? "",
          telefone: user.telefone ?? "",
        }}
        onSubmit={handleUpdate}
      />
    </ScreenContainer>
  );
}
