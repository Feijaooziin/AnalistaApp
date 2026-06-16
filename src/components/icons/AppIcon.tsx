import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import {
  EclaIcon,
  EclaLogo,
  EclaPin,
  EclaPinCircle,
  JbsLogo,
  SearaLogo,
} from "@/src/components/icons";

export type CompanyIcon =
  | "ecla-icon"
  | "ecla-pin"
  | "ecla-pin-circle"
  | "logo-ecla"
  | "logo-jbs"
  | "logo-seara"
  | any;

interface Props {
  name: CompanyIcon | React.ComponentProps<typeof Ionicons>["name"];
  size?: number;
  color?: string;
  onPress?: () => void;
}

export default function AppIcon({
  name,
  size = 24,
  color = "#000",
  onPress,
}: Props) {
  const wrapperStyle = {
    width: size,
    height: size,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  };

  let icon: React.ReactNode;

  switch (name) {
    case "ecla-icon":
      icon = (
        <View style={wrapperStyle}>
          <EclaIcon width={size * 1.1} height={size * 1.1} fill={color} />
        </View>
      );
      break;

    case "ecla-pin":
      icon = (
        <View style={wrapperStyle}>
          <EclaPin width={size * 1.1} height={size * 1.1} fill={color} />
        </View>
      );
      break;

    case "ecla-pin-circle":
      icon = (
        <View style={wrapperStyle}>
          <EclaPinCircle width={size * 1.1} height={size * 1.1} fill={color} />
        </View>
      );
      break;

    case "logo-ecla":
      icon = (
        <View style={wrapperStyle}>
          <EclaLogo width={size * 1.4} height={size} fill={color} />
        </View>
      );
      break;

    case "logo-jbs":
      icon = (
        <View style={wrapperStyle}>
          <JbsLogo width={size * 1.5} height={size * 0.5} fill={color} />
        </View>
      );
      break;

    case "logo-seara":
      icon = (
        <View style={wrapperStyle}>
          <SearaLogo width={size * 1.5} height={size * 0.8} fill={color} />
        </View>
      );
      break;

    default:
      icon = <Ionicons name={name as any} size={size} color={color} />;
  }

  if (!onPress) {
    return <>{icon}</>;
  }

  return (
    <Pressable onPress={onPress} hitSlop={10}>
      {icon}
    </Pressable>
  );
}
