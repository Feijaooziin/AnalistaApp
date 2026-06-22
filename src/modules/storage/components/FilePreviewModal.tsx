import { useTheme } from "@/src/contexts/ThemeContext";
import { Image, Modal, Text, View } from "react-native";

import AppButton from "@/src/components/ui/AppButton";
import { WebView } from "react-native-webview";

interface Props {
  visible: boolean;
  file: any | null;
  onClose: () => void;
}

export default function FilePreviewModal({ visible, file, onClose }: Props) {
  const { colors } = useTheme();

  if (!file) return null;

  const isImage = file.fileType === "image";
  const isPdf = file.fileType === "pdf";

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* HEADER */}
        <View style={{ padding: 16 }}>
          <AppButton title="Fechar" onPress={onClose} variant="outline" />
        </View>

        {/* CONTENT */}
        <View style={{ flex: 1 }}>
          {isImage && (
            <Image
              source={{ uri: file.localUri }}
              style={{ flex: 1, resizeMode: "contain" }}
            />
          )}

          {isPdf && (
            <WebView source={{ uri: file.localUri }} style={{ flex: 1 }} />
          )}

          {!isImage && !isPdf && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: colors.text }}>
                Pré-visualização não disponível
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
