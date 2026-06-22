import { View } from "react-native";
import Pdf from "react-native-pdf";

export default function PdfPreview({ file }: any) {
  return (
    <View style={{ flex: 1 }}>
      <Pdf
        source={{ uri: file.localUri }}
        style={{ flex: 1 }}
        trustAllCerts={false}
      />
    </View>
  );
}
