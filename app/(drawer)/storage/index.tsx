import { useEffect } from "react";
import { View } from "react-native";

import ScreenContainer from "@/src/components/layout/ScreenContainer";
import AppButton from "@/src/components/ui/AppButton";

import { storageRepository } from "@/src/modules/storage/repositories/storageRepository";

export default function StorageScreen() {
  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await storageRepository.list();

    console.log(data);
  }

  async function createTest() {
    await storageRepository.create({
      name: "teste",
      originalName: "teste.pdf",
      extension: "pdf",
      mimeType: "application/pdf",
      fileType: "pdf",
      size: 1000,
      localUri: "/teste.pdf",
    });

    load();
  }

  return (
    <ScreenContainer
      header={{
        title: "Arquivos",
        toggleTheme: true,
      }}
    >
      <View>
        <AppButton title="Criar registro teste" onPress={createTest} />
      </View>
    </ScreenContainer>
  );
}
