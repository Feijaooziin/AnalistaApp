import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";

import FuncionarioForm from "@/src/modules/jbs/FuncionarioForm";

import { usersJbsRepository } from "@/src/database/repositories/usersJbsRepository";
import { User } from "@/src/types/user";

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

  async function handleUpdate() {
    // próximo passo
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
