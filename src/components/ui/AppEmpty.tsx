import { Text, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";

interface Props {
  message?: string;
}

export default function AppEmpty({
  message = "Nenhum registro encontrado",
}: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        padding: 24,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: colors.textSecondary,
        }}
      >
        {message}
      </Text>
    </View>
  );
}
