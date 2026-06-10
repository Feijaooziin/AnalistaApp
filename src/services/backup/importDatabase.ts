import { usersJbsRepository } from "@/src/database/repositories/usersJbsRepository";
import { triggerRefresh } from "@/src/hooks/useRefresh";
import { showSuccess, showUnexpectedError } from "@/src/utils/toast";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";

export async function importDatabase() {
  const result = await DocumentPicker.getDocumentAsync({
    type: "application/json",
  });

  if (result.canceled) {
    return;
  }

  const file = result.assets[0];
  const json = await FileSystem.readAsStringAsync(file.uri);
  const backup = JSON.parse(json);

  if (!backup.usersJbs) {
    showUnexpectedError();
    throw new Error("Arquivo inválido");
  }

  const total = backup.usersJbs.length;
  await usersJbsRepository.clear();
  for (const user of backup.usersJbs) {
    await usersJbsRepository.create({
      nome: user.nome,
      matricula: user.matricula,
      cargo: user.cargo,
      escala: user.escala,
      endereco: user.endereco,
      email: user.email,
      telefone: user.telefone,
    });
  }

  showSuccess("Arquivo importado", `${total} funcionário(s) recuperado(s)`);
  triggerRefresh("usersJbs");
  return total;
}
