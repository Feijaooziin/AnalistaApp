import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

import { usersJbsRepository } from "@/src/database/repositories/usersJbsRepository";
import { showSuccess } from "@/src/utils/toast";
import { BackupData } from "./types";

export async function exportDatabase() {
  const users = await usersJbsRepository.list();
  const backup: BackupData = {
    exportedAt: new Date().toISOString(),
    usersJbs: users,
  };

  const json = JSON.stringify(backup, null, 2);
  const date = new Date().toISOString().split("T")[0];
  const fileUri =
    FileSystem.documentDirectory + `AnalistaAppBackup-${date}.json`;

  await FileSystem.writeAsStringAsync(fileUri, json);

  await Sharing.shareAsync(fileUri);

  showSuccess(
    "Arquivo exportado",
    `${users.length} funcionário(s) exportado(s)`,
  );
}
