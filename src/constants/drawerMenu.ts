import { Ionicons } from "@expo/vector-icons";

export type DrawerMenuItem = {
  label: string;
  route: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export const drawerMenu = [
  {
    label: "Home",
    route: "/home",
    icon: "home-outline",
  },
  {
    label: "ECLA",
    route: "/ecla",
    icon: "business-outline",
  },
  {
    label: "JBS",
    route: "/jbs",
    icon: "people-outline",
  },
  {
    label: "Seara",
    route: "/seara",
    icon: "briefcase-outline",
  },
];
