import { Text, View } from "react-native";
import Pdf from "react-native-pdf";

export default function PdfPreview({ file }: any) {
  return (
    <View style={{ flex: 1 }}>
      <Text>{file.originalName}</Text>
      <Pdf
        source={{ uri: file.localUri }}
        style={{ flex: 1 }}
        trustAllCerts={false}
      />
    </View>
  );
}
