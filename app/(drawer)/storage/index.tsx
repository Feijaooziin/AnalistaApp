import { useState } from "react";
import { FlatList, View } from "react-native";

import ScreenContainer from "@/src/components/layout/ScreenContainer";
import AppButton from "@/src/components/ui/AppButton";
import AppSearchInput from "@/src/components/ui/AppSearchInput";

import { useStorageFiles } from "@/src/modules/storage/hooks/useStorageFiles";
import { pickAndSaveFile } from "@/src/modules/storage/services/filePickerService";

import AppSelectModal from "@/src/components/ui/AppSelectModal";
import FileCard from "@/src/modules/storage/components/FileCard";
import FileInfoBottomSheet from "@/src/modules/storage/components/FileInfoBottomSheet";
import FilePreview from "@/src/modules/storage/components/preview/FilePreview";
import { openFile, shareFile } from "@/src/modules/storage/services/fileOpener";

export default function StorageScreen() {
  const { files, loadFiles, removeFile } = useStorageFiles();

  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [search, setSearch] = useState("");
  const filteredFiles = files.filter((item) =>
    item.originalName.toLowerCase().includes(search.toLowerCase()),
  );

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
    setSelectedFile(null);
  }

  async function handleShare() {
    if (!selectedFile) return;
    setActionsOpen(false);
    await shareFile(selectedFile.localUri);
  }

  async function handleOpen() {
    if (!selectedFile) return;
    setActionsOpen(false);
    await openFile(selectedFile.localUri);
  }

  return (
    <ScreenContainer
      header={{ title: "Storage Drive", toggleTheme: true }}
      scrollable={false}
    >
      <AppSearchInput
        placeholder="Pesquisar arquivos..."
        value={search}
        onChangeText={setSearch}
      />
      <View
        style={{
          flexDirection: "row",
          gap: 12,
          marginBottom: 12,
        }}
      >
        <View style={{ flex: 1 }}>
          <AppButton
            title="Adicionar arquivo"
            leftIcon="add-outline"
            onPress={handlePick}
          />
        </View>

        <AppButton
          title=""
          variant="outline"
          size="sm"
          rightIcon={viewMode === "list" ? "grid-outline" : "list-outline"}
          onPress={() =>
            setViewMode((prev) => (prev === "list" ? "grid" : "list"))
          }
        />
      </View>

      <FlatList
        data={filteredFiles}
        key={viewMode}
        numColumns={viewMode === "grid" ? 2 : 1}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{
          gap: 12,
          paddingBottom: 120,
        }}
        columnWrapperStyle={
          viewMode === "grid"
            ? {
                justifyContent: "flex-start",
                gap: 12,
              }
            : undefined
        }
        renderItem={({ item }) => (
          <FileCard
            compact={viewMode === "grid"}
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

      <AppSelectModal
        visible={actionsOpen}
        onClose={() => setActionsOpen(false)}
        title={selectedFile?.originalName ?? "Arquivo"}
      >
        {(close) => (
          <View style={{ gap: 12 }}>
            <AppButton
              title="Visualizar"
              leftIcon="eye-outline"
              onPress={() => {
                close();
                openPreview(selectedFile);
              }}
            />

            <AppButton
              title="Compartilhar"
              leftIcon="share-outline"
              onPress={() => {
                close();
                handleShare();
              }}
            />

            <AppButton
              title="Informações"
              leftIcon="information-circle-outline"
              variant="outline"
              onPress={() => {
                close();
                setInfoOpen(true);
              }}
            />

            <AppButton
              title="Excluir"
              leftIcon="trash-outline"
              variant="danger"
              onPress={() => {
                close();
                handleDelete();
              }}
            />
          </View>
        )}
      </AppSelectModal>
    </ScreenContainer>
  );
}
