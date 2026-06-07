import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, ICON_SIZE } from "@/src/theme/layout";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type Variant = "primary" | "danger" | "outline";

type IconName = ComponentProps<typeof Ionicons>["name"];

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  variant?: Variant;
  onPress?: () => void;
}

export default function AppButton({
  title,
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  variant = "primary",
  onPress,
  ...rest
}: ButtonProps) {
  const { colors } = useTheme();
  const isDanger = variant === "danger";
  const isOutline = variant === "outline";

  const textColor = isDanger
    ? colors.danger
    : isOutline
      ? colors.secondary
      : "#FFFFFF";

  const backgroundColor = isOutline
    ? "transparent"
    : isDanger
      ? "#FFF5F7"
      : colors.secondary;

  const borderColor = isDanger ? colors.danger : colors.secondary;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...rest}
      style={[
        {
          paddingVertical: 14,
          paddingHorizontal: 16,
          borderRadius: 12,

          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,

          backgroundColor,
          borderWidth: 1,
          borderColor,

          opacity: disabled ? 0.5 : 1,

          width: fullWidth ? "100%" : undefined,
        },
        rest.style,
      ]}
    >
      {/* LEFT ICON / LOADING */}
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        leftIcon && (
          <Ionicons name={leftIcon} size={ICON_SIZE.md} color={textColor} />
        )
      )}

      {/* TITLE */}
      <Text
        style={{
          color: textColor,
          fontSize: FONT_SIZE.xl,
          fontWeight: "600",
        }}
      >
        {title}
      </Text>

      {/* RIGHT ICON */}
      {!loading && rightIcon && (
        <Ionicons name={rightIcon} size={ICON_SIZE.md} color={textColor} />
      )}
    </TouchableOpacity>
  );
}
