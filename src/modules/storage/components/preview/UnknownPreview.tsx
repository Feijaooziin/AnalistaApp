import { Text, View } from "react-native";

export default function UnknownPreview({ file }: any) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff" }}>Preview não suportado</Text>

      <Text style={{ color: "#aaa", marginTop: 8 }}>{file.originalName}</Text>
    </View>
  );
}
