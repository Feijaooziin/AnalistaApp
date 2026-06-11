import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import {
  EclaIcon,
  EclaLogo,
  EclaPin,
  EclaPinCircle,
  JbsLogo,
  SearaLogo,
} from "@/src/components/icons";

type CompanyIcon =
  | "ecla-icon"
  | "ecla-pin"
  | "ecla-pin-circle"
  | "logo-ecla"
  | "logo-jbs"
  | "logo-seara";

interface Props {
  name: CompanyIcon | React.ComponentProps<typeof Ionicons>["name"];
  size?: number;
  color?: string;
}

export default function AppIcon({ name, size = 24, color = "#000" }: Props) {
  const wrapperStyle = {
    width: size,
    height: size,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  };

  switch (name) {
    case "ecla-icon":
      return (
        <View style={wrapperStyle}>
          <EclaIcon width={size * 1.1} height={size * 1.1} fill={color} />
        </View>
      );

    case "ecla-pin":
      return (
        <View style={wrapperStyle}>
          <EclaPin width={size * 1.1} height={size * 1.1} fill={color} />
        </View>
      );

    case "ecla-pin-circle":
      return (
        <View style={wrapperStyle}>
          <EclaPinCircle width={size * 1.1} height={size * 1.1} fill={color} />
        </View>
      );

    case "logo-ecla":
      return (
        <View style={wrapperStyle}>
          <EclaLogo width={size * 1.4} height={size} fill={color} />
        </View>
      );

    case "logo-jbs":
      return (
        <View style={wrapperStyle}>
          <JbsLogo width={size * 1.5} height={size * 0.5} fill={color} />
        </View>
      );

    case "logo-seara":
      return (
        <View style={wrapperStyle}>
          <SearaLogo width={size * 1.5} height={size * 0.8} fill={color} />
        </View>
      );

    default:
      return (
        <View style={wrapperStyle}>
          <Ionicons name={name as any} size={size} color={color} />;
        </View>
      );
  }
}
