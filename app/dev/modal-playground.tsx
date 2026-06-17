import { useState } from "react";
import { View } from "react-native";

import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";
import AppButton from "@/src/components/ui/AppButton";

import AppBottomSheet from "@/src/components/ui/AppBottomSheet";
import AppModal from "@/src/components/ui/AppModal";
import AppSelectModal from "@/src/components/ui/AppSelectBottomSheet";
import { showInfo } from "@/src/utils/toast";

export default function ModalPlayground() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);

  const [fruit, setFruit] = useState("" as any);
  const fruits = [
    { label: "Maçã", value: "Maçã" },
    { label: "Abacaxi", value: "Abacaxi" },
    { label: "Melancia", value: "Melancia" },
  ];

  return (
    <ScreenContainer
      header={{ title: "Modal Playground", variant: "back", toggleTheme: true }}
    >
      <View style={{ gap: 12 }}>
        <PageContext
          title="Testes de Modais"
          subtitle="Validando UI antes de integrar no fluxo"
        />

        <AppButton title="Abrir AppModal" onPress={() => setModalOpen(true)} />

        <AppButton
          title="Abrir BottomSheet"
          variant="outline"
          onPress={() => setSheetOpen(true)}
        />

        <AppButton
          title="Abrir SelectModal"
          variant="danger"
          onPress={() => setSelectOpen(true)}
        />
      </View>

      {/* AppModal */}
      <AppModal visible={modalOpen} onClose={() => setModalOpen(false)}>
        {(close) => <AppButton title="Fechar Modal" onPress={() => close()} />}
      </AppModal>

      {/* BottomSheet */}
      <AppBottomSheet
        initialSnap={0.5}
        title="Teste Modal"
        visible={sheetOpen}
        onClose={() => setSheetOpen(false)}
      >
        {(close) => <AppButton title="Fechar BottomSheet" onPress={close} />}
      </AppBottomSheet>

      {/* SelectModal */}
      <AppSelectModal
        initialSnap={0.55}
        visible={selectOpen}
        onClose={() => setSelectOpen(false)}
        options={[
          { label: "Opção 1", value: "1" },
          { label: "Opção 2", value: "2" },
          { label: "Opção 3", value: "3" },
          { label: "Opção 4", value: "4" },
          { label: "Opção 5", value: "5" },
        ]}
        onSelect={(v) => {
          showInfo(`Selecionado opção ${v}`);
        }}
      />
    </ScreenContainer>
  );
}
