import AppButton from "@/src/components/ui/AppButton";

import * as DocumentPicker from "expo-document-picker";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import ScreenContainer from "@/src/components/layout/ScreenContainer";

import { storageRepository } from "@/src/modules/storage/repositories/storageRepository";
import { getFileType } from "@/src/modules/storage/utils/getFileType";

import FileActionsBottomSheet from "@/src/modules/storage/components/FileActionsBottomSheet";
import FileCard from "@/src/modules/storage/components/FileCard.tsx";
import FilePreviewModal from "@/src/modules/storage/components/FilePreviewModal";

import {
  openFile,
  shareFile,
} from "@/src/modules/storage/services/fileOpener.ts";

export default function StorageScreen() {
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);

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

  function openActions(file: any) {
    setSelectedFile(file);
    setActionsOpen(true);
  }

  function openPreview(file: any) {
    setSelectedFile(file);
    setPreviewOpen(true);
  }

  async function handleDelete() {
    if (!selectedFile) return;

    await storageRepository.delete(selectedFile.id);
    await loadFiles();

    setActionsOpen(false);
  }

  async function handleShare() {
    if (!selectedFile) return;

    await shareFile(selectedFile.localUri);
  }

  async function handleOpen() {
    if (!selectedFile) return;

    await openFile(selectedFile.localUri);
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
            onLongPress={() => openActions(item)}
          />
        )}
      />

      {/* PREVIEW */}
      <FilePreviewModal
        visible={previewOpen}
        file={selectedFile}
        onClose={() => setPreviewOpen(false)}
      />

      {/* ACTIONS SHEET */}
      <FileActionsBottomSheet
        visible={actionsOpen}
        onClose={() => setActionsOpen(false)}
        onOpen={handleOpen}
        onShare={handleShare}
        onDelete={handleDelete}
      />
    </ScreenContainer>
  );
}
