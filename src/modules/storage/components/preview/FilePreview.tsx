import { Modal, View } from "react-native";

import FilePreviewHeader from "@/src/modules/storage/components/FilePreviewHeader";

import ImagePreview from "@/src/modules/storage/components/preview/ImagePreview";
import PdfPreview from "@/src/modules/storage/components/preview/PdfPreview";
import UnknownPreview from "@/src/modules/storage/components/preview/UnknownPreview";

import { openFile, shareFile } from "@/src/modules/storage/services/fileOpener";

export default function FilePreview({ visible, file, onClose }: any) {
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
      <View style={{ flex: 1 }}>
        <FilePreviewHeader
          title={file.originalName}
          onClose={onClose}
          onOpen={() => openFile(file.localUri)}
          onShare={() => shareFile(file.localUri)}
        />

        {renderPreview()}
      </View>
    </Modal>
  );
}
