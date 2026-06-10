import { usersJbsRepository } from "@/src/database/repositories/usersJbsRepository";
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

  for (const user of backup.usersJbs) {
    await usersJbsRepository.clear();
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
}
