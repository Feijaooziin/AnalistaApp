import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

export async function openFile(uri: string) {
  await Sharing.shareAsync(uri);
}

export async function shareFile(uri: string) {
  if (!(await Sharing.isAvailableAsync())) return;

  await Sharing.shareAsync(uri);
}

export async function deleteFile(uri: string) {
  const exists = await FileSystem.getInfoAsync(uri);

  if (exists.exists) {
    await FileSystem.deleteAsync(uri);
  }
}
