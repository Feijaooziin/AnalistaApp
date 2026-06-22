import AppButton from "@/src/components/ui/AppButton";
import { View } from "react-native";

interface Props {
  onOpen: () => void;
  onShare: () => void;
  onDelete: () => void;
}

export default function FileActionsBottomSheet({
  onOpen,
  onShare,
  onDelete,
}: Props) {
  return (
    <View style={{ gap: 12 }}>
      <AppButton title="Abrir" onPress={onOpen} leftIcon="eye-outline" />
      <AppButton
        title="Compartilhar"
        onPress={onShare}
        leftIcon="share-outline"
      />
      <AppButton
        title="Excluir"
        onPress={onDelete}
        leftIcon="trash-outline"
        variant="danger"
      />
    </View>
  );
}
