import { View, Text, Image, StatusBar } from "react-native";
import { COLORS } from "../constants/colors";

export default function Header() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: (StatusBar.currentHeight ?? 0) + 8,
        paddingHorizontal: 24,
        paddingBottom: 16,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
        zIndex: 10,
      }}
    >
      <View>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: COLORS.primary,
          }}
        >
          Advertências
        </Text>

        <Text
          style={{
            fontSize: 14,
            color: COLORS.textSecondary,
            marginTop: 4,
          }}
        >
          Gere advertências e suspensões em PDF.
        </Text>
      </View>
      <Image
        source={require("../../assets/logo.png")}
        style={{
          width: 48,
          height: 48,
        }}
      />
    </View>
  );
}
