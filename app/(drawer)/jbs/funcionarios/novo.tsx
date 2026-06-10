import { router } from "expo-router";

import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";

import { usersJbsRepository } from "@/src/database/repositories/usersJbsRepository";
import { triggerRefresh } from "@/src/hooks/useRefresh";
import FuncionarioForm from "@/src/modules/jbs/FuncionarioForm";

export default function NovoFuncionario() {
  async function handleCreate(data: any) {
    await usersJbsRepository.create({
      nome: data.nome,
      matricula: data.matricula || null,
      cargo: data.cargo || null,
      escala: data.escala || null,
      endereco: data.endereco || null,
      email: data.email || null,
      telefone: data.telefone || null,
    });

    triggerRefresh("usersJbs");
    router.back();
  }

  return (
    <ScreenContainer header={{ title: "Adicionar", variant: "back" }}>
      <PageContext title="Novo Funcionário" />

      <FuncionarioForm
        buttonTitle="Salvar funcionário"
        initialValues={{
          nome: "",
          matricula: "",
          cargo: "Auxiliar de operações",
          escala: "SEG / SEX - 20H / 05H",
          endereco: "",
          email: "",
          telefone: "",
        }}
        onSubmit={handleCreate}
      />
    </ScreenContainer>
  );
}
