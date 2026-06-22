import AppButton from "@/src/components/ui/AppButton";

import * as DocumentPicker from "expo-document-picker";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

import ScreenContainer from "@/src/components/layout/ScreenContainer";

import { storageRepository } from "@/src/modules/storage/repositories/storageRepository";
import { getFileType } from "@/src/modules/storage/utils/getFileType";

import FileActionsBottomSheet from "@/src/modules/storage/components/FileActionsBottomSheet";
import FileCard from "@/src/modules/storage/components/FileCard.tsx";
import FilePreviewModal from "@/src/modules/storage/components/FilePreviewModal";

import AppIcon from "@/src/components/icons/AppIcon";
import {
  openFile,
  shareFile,
} from "@/src/modules/storage/services/fileOpener.ts";

export default function StorageScreen() {
  const [files, setFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadFiles();
  }, []);

  async function loadFiles() {
    setLoading(true);

    try {
      const data = await storageRepository.list();
      setFiles(data);
    } finally {
      setLoading(false);
    }
  }

  async function pickFile() {
    try {
      setUploading(true);

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

      await loadFiles();
    } finally {
      setUploading(false);
    }
  }

  function openActions(file: any) {
    setSelectedFile(file);
    setActionsOpen(true);
  }

  function openPreview(file: any) {
    setSelectedFile(file);
    setPreviewOpen(true);
  }

  async function handleRefresh() {
    setRefreshing(true);

    await loadFiles();

    setRefreshing(false);
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
        <AppButton
          title="Adicionar arquivo"
          onPress={pickFile}
          loading={uploading}
        />
      </View>

      <FlatList
        data={files}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{
          gap: 12,
          paddingBottom: 120,
          flexGrow: 1,
        }}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={() =>
          !loading ? (
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <AppIcon name="cloud-offline-outline" size={40} color="#999" />
              <Text style={{ marginTop: 10, color: "#999" }}>
                Nenhum arquivo encontrado
              </Text>
            </View>
          ) : null
        }
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
