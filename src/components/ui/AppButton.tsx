import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, ICON_SIZE } from "@/src/theme/layout";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import AppIcon, { CompanyIcon } from "../icons/AppIcon";

type Variant = "primary" | "danger" | "outline";

type IconName = CompanyIcon | React.ComponentProps<typeof Ionicons>["name"];

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
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
  size,
  variant = "primary",
  onPress,
  ...rest
}: ButtonProps) {
  const { colors } = useTheme();
  const isDanger = variant === "danger";
  const isOutline = variant === "outline";

  const textColor = isDanger
    ? "#FFFFFF"
    : isOutline
      ? colors.secondary
      : "#FFFFFF";

  const backgroundColor = isOutline
    ? "transparent"
    : isDanger
      ? colors.danger
      : colors.secondary;

  const borderColor = isDanger ? colors.danger : colors.secondary;

  const sizes = {
    sm: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      fontSize: FONT_SIZE.lg,
      icon: ICON_SIZE.sm,
    },

    md: {
      paddingVertical: 14,
      paddingHorizontal: 16,
      fontSize: FONT_SIZE.xl,
      icon: ICON_SIZE.md,
    },

    lg: {
      paddingVertical: 18,
      paddingHorizontal: 20,
      fontSize: FONT_SIZE.xxl,
      icon: ICON_SIZE.lg,
    },
  };

  const currentSize = sizes[size ?? "md"];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...rest}
      style={[
        {
          paddingVertical: currentSize.paddingVertical,
          paddingHorizontal: currentSize.paddingHorizontal,
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
          <AppIcon name={leftIcon} size={currentSize.icon} color={textColor} />
        )
      )}

      {/* TITLE */}
      <Text
        style={{
          color: textColor,
          fontSize: currentSize.fontSize,
          fontWeight: "600",
        }}
      >
        {title}
      </Text>

      {/* RIGHT ICON */}
      {!loading && rightIcon && (
        <AppIcon name={rightIcon} size={currentSize.icon} color={textColor} />
      )}
    </TouchableOpacity>
  );
}
