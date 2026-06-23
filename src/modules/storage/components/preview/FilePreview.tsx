import { Modal, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTheme } from "@/src/contexts/ThemeContext";
import { openFile, shareFile } from "@/src/modules/storage/services/fileOpener";

import AppButton from "@/src/components/ui/AppButton";
import ImagePreview from "@/src/modules/storage/components/preview/ImagePreview";
import PdfPreview from "@/src/modules/storage/components/preview/PdfPreview";
import UnknownPreview from "@/src/modules/storage/components/preview/UnknownPreview";
import { StorageFile } from "@/src/modules/storage/types/StorageFile";
import FilePreviewHeader from "../FilePreviewHeader";

interface Props {
  visible: boolean;
  file: StorageFile | null;
  onClose: () => void;
  onDelete?: (file: StorageFile) => void;
}

export default function FilePreview({ visible, file, onClose }: any) {
  const { colors } = useTheme();

  if (!file) return null;

  function renderPreview() {
    switch (file.fileType) {
      case "image":
        return <ImagePreview file={file} />;

      case "pdf":
        return <PdfPreview file={file} />;

      default:
        return <UnknownPreview file={file} />;
    }
  }

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView
        edges={["top"]}
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        {/* HEADER */}
        <FilePreviewHeader
          title={file.originalName}
          onClose={onClose}
          onOpen={() => openFile(file.localUri)}
          onShare={() => shareFile(file.localUri)}
        />

        {/* PREVIEW */}
        <View
          style={{
            flex: 1,
          }}
        >
          {renderPreview()}
        </View>

        {/* ACTION BAR */}

        <View
          style={{
            flexDirection: "row",
            gap: 8,
            padding: 16,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            backgroundColor: colors.surface,
          }}
        >
          <View style={{ flex: 1 }}>
            <AppButton
              title="Abrir"
              leftIcon="open-outline"
              onPress={() => openFile(file.localUri)}
            />
          </View>

          <View style={{ flex: 1 }}>
            <AppButton
              title="Compartilhar"
              leftIcon="share-social-outline"
              variant="outline"
              onPress={() => shareFile(file.localUri)}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
