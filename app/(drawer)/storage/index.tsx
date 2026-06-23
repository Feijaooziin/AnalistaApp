import ScreenContainer from "@/src/components/layout/ScreenContainer";
import AppButton from "@/src/components/ui/AppButton";
import { FlatList, View } from "react-native";

import { useStorageFiles } from "@/src/modules/storage/hooks/useStorageFiles";
import { pickAndSaveFile } from "@/src/modules/storage/services/filePickerService";

import FileCard from "@/src/modules/storage/components/FileCard";

import FileInfoBottomSheet from "@/src/modules/storage/components/FileInfoBottomSheet";
import FilePreview from "@/src/modules/storage/components/preview/FilePreview";
import { openFile, shareFile } from "@/src/modules/storage/services/fileOpener";
import { useState } from "react";

export default function StorageScreen() {
  const { files, loadFiles, removeFile } = useStorageFiles();

  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  async function handlePick() {
    await pickAndSaveFile();
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

    await removeFile(selectedFile.id);
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
        <AppButton title="Adicionar arquivo" onPress={handlePick} />
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

      <FilePreview
        visible={previewOpen}
        file={selectedFile}
        onClose={() => setPreviewOpen(false)}
        onInfo={() => setInfoOpen(true)}
      />

      <FileInfoBottomSheet
        visible={infoOpen}
        file={selectedFile}
        onClose={() => setInfoOpen(false)}
      />

      {/* <FileActionsBottomSheet
        visible={actionsOpen}
        onClose={() => setActionsOpen(false)}
        onOpen={handleOpen}
        onShare={handleShare}
        onDelete={handleDelete}
      /> */}
    </ScreenContainer>
  );
}
