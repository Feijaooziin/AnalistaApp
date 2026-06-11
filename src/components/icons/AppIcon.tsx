import { Ionicons } from "@expo/vector-icons";

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
  switch (name) {
    case "ecla-icon":
      return <EclaIcon width={size} height={size} fill={color} />;

    case "ecla-pin":
      return <EclaPin width={size} height={size} fill={color} />;

    case "ecla-pin-circle":
      return <EclaPinCircle width={size} height={size} fill={color} />;

    case "logo-ecla":
      return <EclaLogo width={size * 4} height={size} fill={color} />;

    case "logo-jbs":
      return <JbsLogo width={size * 3} height={size} fill={color} />;

    case "logo-seara":
      return <SearaLogo width={size * 3} height={size} fill={color} />;

    default:
      return <Ionicons name={name as any} size={size} color={color} />;
  }
}
