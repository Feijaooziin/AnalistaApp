import { ActivityIndicator, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";

export default function AppLoading() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
