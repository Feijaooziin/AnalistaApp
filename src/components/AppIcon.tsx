import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export default function AppIcon({ name, size = 24, color }: any) {
  const { isDark } = useTheme();
  switch (name) {
    case "ecla":
      return (
        <Image
          source={
            isDark
              ? require("@/assets/images/ECLA/ECLA-Icon-White.png")
              : require("@/assets/images/ECLA/ECLA-Icon-Color.png")
          }
          style={{
            width: size,
            height: size,
            objectFit: "contain",
          }}
        />
      );

    case "jbs":
      return (
        <Image
          source={
            isDark
              ? require("@/assets/images/JBS/JBS-Logo-White.png")
              : require("@/assets/images/JBS/JBS-Logo-Color.png")
          }
          style={{
            width: size,
            height: size,
            objectFit: "contain",
          }}
        />
      );

    case "seara":
      return (
        <Image
          source={
            isDark
              ? require("@/assets/images/SEARA/SEARA-Logo-White.png")
              : require("@/assets/images/SEARA/SEARA-Logo-Color.png")
          }
          style={{
            width: size,
            height: size,
            objectFit: "contain",
          }}
        />
      );

    default:
      return <Ionicons name={name} size={size} color={color} />;
  }
}
