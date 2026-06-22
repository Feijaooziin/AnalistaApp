import AppButton from "@/src/components/ui/AppButton";
import { View } from "react-native";

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
  if (!visible) return null;

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: "#000000aa",
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
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
      </View>
    </View>
  );
}
