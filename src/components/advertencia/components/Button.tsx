import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { COLORS } from "../constants/colors";

type Variant = "primary" | "danger";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  icon?: ReactNode;
  variant?: Variant;
}

export function Button({
  title,
  icon,
  variant = "primary",
  ...rest
}: ButtonProps) {
  const isDanger = variant === "danger";

  return (
    <TouchableOpacity
      {...rest}
      style={[
        {
          paddingVertical: 14,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 8,
          borderWidth: 1,
          borderColor: isDanger ? COLORS.danger : COLORS.secondary,
          backgroundColor: isDanger ? "#FFF5F7" : COLORS.secondary,
        },
        rest.style,
      ]}
    >
      {icon}

      <Text
        style={{
          color: isDanger ? COLORS.danger : "#FFFFFF",
          fontSize: 20,
          fontWeight: "600",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
