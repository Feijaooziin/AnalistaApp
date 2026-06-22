import * as DocumentPicker from "expo-document-picker";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import ScreenContainer from "@/src/components/layout/ScreenContainer";
import AppButton from "@/src/components/ui/AppButton";

import { storageRepository } from "@/src/modules/storage/repositories/storageRepository";
import { getFileType } from "@/src/modules/storage/utils/getFileType";

import FileCard from "@/src/modules/storage/components/FileCard.tsx";

export default function StorageScreen() {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    loadFiles();
  }, []);

  async function loadFiles() {
    const data = await storageRepository.list();
    setFiles(data);
  }

  async function handlePickFile() {
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

  return (
    <ScreenContainer
      header={{
        title: "Storage",
        toggleTheme: true,
      }}
      scrollable={false}
    >
      <View style={{ gap: 12, marginBottom: 12 }}>
        <AppButton
          title="Adicionar arquivo"
          leftIcon="add"
          onPress={handlePickFile}
        />

        <AppButton title="Recarregar" variant="outline" onPress={loadFiles} />
      </View>

      <FlatList
        data={files}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{
          gap: 12,
          paddingBottom: 120,
        }}
        renderItem={({ item }) => (
          <FileCard
            name={item.name}
            originalName={item.originalName}
            fileType={item.fileType}
            size={item.size}
          />
        )}
      />
    </ScreenContainer>
  );
}
