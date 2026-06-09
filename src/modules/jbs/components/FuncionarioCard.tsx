import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

import { User } from "@/src/types/user";

import { useTheme } from "@/src/contexts/ThemeContext";

import { FONT_SIZE, ICON_SIZE, RADIUS, SPACING } from "@/src/theme/layout";

interface Props {
  user: User;
  onPress?: () => void;
}

export default function FuncionarioCard({ user, onPress }: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        backgroundColor: colors.surface,
        padding: SPACING.md,
        borderRadius: RADIUS.md,

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flex: 1,
          marginRight: SPACING.md,
        }}
      >
        <Text
          style={{
            fontSize: FONT_SIZE.md,
            fontWeight: "700",
            color: colors.text,
          }}
        >
          {user.nome}
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 2,
          }}
        >
          Matrícula: {user.matricula ?? "-"}
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 2,
          }}
        >
          {user.cargo ?? "-"}
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            marginTop: 2,
          }}
        >
          {user.escala ?? "-"}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={ICON_SIZE.md}
        color={colors.textSecondary}
      />
    </TouchableOpacity>
  );
}
