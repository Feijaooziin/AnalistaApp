import * as DocumentPicker from "expo-document-picker";

import { storageRepository } from "@/src/modules/storage/repositories/storageRepository";
import { getFileType } from "@/src/modules/storage/utils/getFileType";
import { generateVideoThumbnail } from "./videoThumbnailService";

export async function pickAndSaveFile() {
  const result = await DocumentPicker.getDocumentAsync({
    type: "*/*",
    multiple: false,
    copyToCacheDirectory: true,
  });

  if (result.canceled) return null;

  const file = result.assets[0];

  const fileType = getFileType(file.mimeType || "", file.name);

  let thumbnailUri: string | undefined;

  if (fileType === "video") {
    try {
      thumbnailUri = await generateVideoThumbnail(file.uri);
    } catch {
      thumbnailUri = undefined;
    }
  }

  const newFile = {
    name: file.name.split(".")[0],
    originalName: file.name,
    extension: file.name.split(".").pop() || "",
    mimeType: file.mimeType || "",
    fileType,
    size: file.size || 0,
    localUri: file.uri,
    thumbnailUri,
  };

  await storageRepository.create(newFile);

  return newFile;
}
