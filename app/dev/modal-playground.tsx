import { useState } from "react";
import { View } from "react-native";

import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";
import AppButton from "@/src/components/ui/AppButton";

// depois vamos usar essas imports reais
import AppBottomSheet from "@/src/components/ui/AppBottomSheet";
import AppModal from "@/src/components/ui/AppModal";
import AppSelectModal from "@/src/components/ui/AppSelectModal";
import { showInfo } from "@/src/utils/toast";

export default function ModalPlayground() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);

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
        <View style={{ padding: 20 }}>
          <AppButton title="Fechar Modal" onPress={() => setModalOpen(false)} />
        </View>
      </AppModal>

      {/* BottomSheet */}
      <AppBottomSheet visible={sheetOpen} onClose={() => setSheetOpen(false)}>
        {(close) => (
          <View style={{ padding: 20 }}>
            <AppButton title="Fechar BottomSheet" onPress={close} />
          </View>
        )}
      </AppBottomSheet>

      {/* SelectModal */}
      <AppSelectModal
        title="Selecionar opção"
        visible={selectOpen}
        onClose={() => setSelectOpen(false)}
        options={[
          { label: "Opção 1", value: "1" },
          { label: "Opção 2", value: "2" },
          { label: "Opção 3", value: "3" },
          { label: "Opção 4", value: "4" },
          { label: "Opção 5", value: "5" },
          { label: "Opção 6", value: "6" },
          { label: "Opção 7", value: "7" },
          { label: "Opção 8", value: "8" },
          { label: "Opção 9", value: "9" },
        ]}
        onSelect={(v) => {
          showInfo(`Selecionado opção ${v}`);
          setSelectOpen(false);
        }}
      />
    </ScreenContainer>
  );
}
