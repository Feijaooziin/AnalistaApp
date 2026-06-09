import { ReactNode } from "react";
import {
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, RADIUS, SPACING } from "@/src/theme/layout";

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

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
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
        <Text
          style={{
            fontSize: FONT_SIZE.md,
            color: colors.text,
          }}
        >
          {value}
        </Text>
      )}

      {children}
    </Container>
  );
}
