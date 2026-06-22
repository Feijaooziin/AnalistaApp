import * as DocumentPicker from "expo-document-picker";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import ScreenContainer from "@/src/components/layout/ScreenContainer";

import { storageRepository } from "@/src/modules/storage/repositories/storageRepository";
import { getFileType } from "@/src/modules/storage/utils/getFileType";

import FileCard from "@/src/modules/storage/components/FileCard.tsx";
import FilePreviewModal from "@/src/modules/storage/components/FilePreviewModal";

import AppButton from "@/src/components/ui/AppButton";
import { deleteFile } from "@/src/modules/storage/services/fileOpener.ts";

export default function StorageScreen() {
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    loadFiles();
  }, []);

  async function loadFiles() {
    const data = await storageRepository.list();
    setFiles(data);
  }

  async function pickFile() {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      multiple: false,
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const file = result.assets[0];

    const fileType = getFileType(file.mimeType || "", file.name);

    await storageRepository.create({
      name: file.name.split(".")[0],
      originalName: file.name,
      extension: file.name.split(".").pop() || "",
      mimeType: file.mimeType || "",
      fileType,
      size: file.size || 0,
      localUri: file.uri,
    });

    loadFiles();
  }

  function openPreview(file: any) {
    setSelectedFile(file);
    setPreviewOpen(true);
  }

  async function handleDelete(file: any) {
    await deleteFile(file.localUri);
    await storageRepository.delete(file.id);
    loadFiles();
  }

  return (
    <ScreenContainer
      header={{ title: "Storage Drive", toggleTheme: true }}
      scrollable={false}
    >
      <View style={{ marginBottom: 12 }}>
        <AppButton title="Adicionar arquivo" onPress={pickFile} />
      </View>

      <FlatList
        data={files}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ gap: 12, paddingBottom: 120 }}
        renderItem={({ item }) => (
          <FileCard
            file={item}
            onPress={() => openPreview(item)}
            onLongPress={() => openPreview(item)}
          />
        )}
      />

      {/* PREVIEW (Google Drive style) */}
      <FilePreviewModal
        visible={previewOpen}
        file={selectedFile}
        onClose={() => setPreviewOpen(false)}
      />

      {/* FUTURO: ACTIONS (aqui entra bottomsheet depois) */}
    </ScreenContainer>
  );
}
