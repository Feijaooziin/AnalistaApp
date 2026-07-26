import AppButton from "@/src/components/ui/AppButton";
import { Modal, Pressable } from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;

  onOpen: () => void;
  onShare: () => void;
  onDelete: () => void;
}

export default function FileActionsBottomSheet({
  visible,
  onClose,
  onOpen,
  onShare,
  onDelete,
}: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "#00000066",
        }}
        onPress={onClose}
      >
        <Pressable
          onPress={() => {}}
          style={{
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 16,
            gap: 12,
          }}
        >
          <AppButton title="Abrir" leftIcon="eye-outline" onPress={onOpen} />

          <AppButton
            title="Compartilhar"
            leftIcon="share-outline"
            onPress={onShare}
          />

          <AppButton
            title="Excluir"
            leftIcon="trash-outline"
            variant="danger"
            onPress={onDelete}
          />

          <AppButton title="Cancelar" variant="outline" onPress={onClose} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}
