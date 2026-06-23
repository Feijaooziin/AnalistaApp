import { Text, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";

import AppBottomSheet from "@/src/components/ui/AppBottomSheet";
import { formatFileSize } from "@/src/modules/storage/utils/formatFileSize";

interface Props {
  visible: boolean;
  file: any;
  onClose: () => void;
}

export default function FileInfoBottomSheet({ visible, file, onClose }: Props) {
  const { colors } = useTheme();

  if (!file) return null;

  function Item({ label, value }: { label: string; value: string }) {
    return (
      <View
        style={{
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            color: colors.textMuted,
            fontSize: 12,
          }}
        >
          {label}
        </Text>

        <Text
          style={{
            color: colors.text,
            marginTop: 4,
          }}
        >
          {value}
        </Text>
      </View>
    );
  }

  return (
    <AppBottomSheet visible={visible} onClose={onClose} title="Informações">
      <Item label="Nome" value={file.originalName} />

      <Item label="Tipo" value={file.fileType} />

      <Item label="Extensão" value={file.extension} />

      <Item label="Tamanho" value={formatFileSize(file.size)} />

      <Item label="Mime Type" value={file.mimeType} />

      <Item label="Local" value={file.localUri} />

      <Item label="Criado em" value={file.createdAt ?? "-"} />
    </AppBottomSheet>
  );
}
