import { StorageFile } from "@/src/modules/storage/types/StorageFile";
import { Modal, View } from "react-native";

import ImagePreview from "./ImagePreview";
import PdfPreview from "./PdfPreview";
import UnknownPreview from "./UnknownPreview";
import VideoPreview from "./VideoPreview";

interface Props {
  visible: boolean;
  file: StorageFile | null;
  onClose: () => void;
  thumbnail?: string;
}

export default function FilePreview({ visible, file, onClose }: Props) {
  if (!file) return null;

  function renderPreview() {
    switch (file?.fileType) {
      case "image":
        return <ImagePreview file={file} />;

      case "pdf":
        return <PdfPreview file={file} />;

      case "video":
        return <VideoPreview file={file} />;

      default:
        return <UnknownPreview file={file} />;
    }
  }

  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        {renderPreview()}
      </View>
    </Modal>
  );
}
