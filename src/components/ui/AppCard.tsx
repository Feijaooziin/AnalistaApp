import * as Clipboard from "expo-clipboard";
import { ReactNode } from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, ICON_SIZE, RADIUS, SPACING } from "@/src/theme/layout";
import { showSuccess } from "@/src/utils/toast";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title?: string;
  value?: string | number | null;
  children?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  copyable?: boolean;
}

export default function AppCard({
  title,
  value,
  children,
  onPress,
  style,
  copyable,
}: Props) {
  const { colors } = useTheme();
  const isTouchable = !!onPress || copyable;

  const Container = isTouchable ? TouchableOpacity : View;

  async function handleCopy() {
    if (!value) return;

    await Clipboard.setStringAsync(String(value));

    showSuccess(
      "Copiado",
      `${title ?? "Valor"} copiado para a área de transferência.`,
    );
  }

  return (
    <Container
      onPress={onPress ?? handleCopy}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: colors.surface,
          padding: SPACING.md,
          borderRadius: RADIUS.md,
        },
        style,
      ]}
    >
      {title && (
        <Text
          style={{
            color: colors.textSecondary,
            marginBottom: 4,
          }}
        >
          {title}
        </Text>
      )}

      {value !== undefined && value !== null && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FONT_SIZE.md,
              color: colors.text,
            }}
          >
            {value}
          </Text>

          {copyable && (
            <Ionicons
              name="copy-outline"
              size={ICON_SIZE.sm}
              color={colors.textSecondary}
            />
          )}
        </View>
      )}

      {children}
    </Container>
  );
}
