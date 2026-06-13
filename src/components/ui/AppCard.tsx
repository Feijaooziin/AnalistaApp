import * as Clipboard from "expo-clipboard";
import { ReactNode } from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import AppIcon from "@/src/components/icons/AppIcon";
import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, ICON_SIZE, RADIUS, SPACING } from "@/src/theme/layout";
import { showSuccess } from "@/src/utils/toast";

interface Props {
  title?: string;
  value?: string | number | null;
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  copyable?: boolean;
}

export default function AppCard({
  title,
  value,
  size,
  children,
  onPress,
  style,
  copyable,
}: Props) {
  const { colors } = useTheme();
  const isTouchable = !!onPress || copyable;
  const Container = isTouchable ? TouchableOpacity : View;

  const sizes = {
    sm: {
      padding: SPACING.sm,
      title: FONT_SIZE.xs,
      valueFontSize: FONT_SIZE.sm,
      icon: ICON_SIZE.sm,
    },

    md: {
      padding: SPACING.md,
      title: FONT_SIZE.sm,
      valueFontSize: FONT_SIZE.md,
      icon: ICON_SIZE.md,
    },

    lg: {
      padding: SPACING.lg,
      title: FONT_SIZE.md,
      valueFontSize: FONT_SIZE.xl,
      icon: ICON_SIZE.lg,
    },
  };

  const currentSize = sizes[size ?? "md"];

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
          padding: currentSize.padding,
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
            fontSize: currentSize.title,
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
              fontSize: currentSize.valueFontSize,
              color: colors.text,
            }}
          >
            {value}
          </Text>

          {copyable && (
            <AppIcon
              name="copy-outline"
              size={currentSize.icon}
              color={colors.textSecondary}
            />
          )}
        </View>
      )}

      {children}
    </Container>
  );
}
