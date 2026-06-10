import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

import { usersJbsRepository } from "@/src/database/repositories/usersJbsRepository";

export async function exportDatabase() {
  const users = await usersJbsRepository.list();

  const backup = {
    exportedAt: new Date().toISOString(),
    usersJbs: users,
  };

  const json = JSON.stringify(backup, null, 2);

  const fileUri = FileSystem.documentDirectory + `backup-${Date.now()}.json`;

  await FileSystem.writeAsStringAsync(fileUri, json);

  await Sharing.shareAsync(fileUri);
}
