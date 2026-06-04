import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";

type IconName = ComponentProps<typeof Ionicons>["name"];

export type MenuItem = {
  label: string;
  route: string;
  icon?: IconName;
};

export const drawerMenu: MenuItem[] = [
  {
    label: "Home",
    route: "home",
    icon: "home-outline",
  },
  {
    label: "ECLA",
    route: "ecla",
    icon: "business-outline",
  },
  {
    label: "JBS",
    route: "jbs",
    icon: "cube-outline",
  },
  {
    label: "Seara",
    route: "seara",
    icon: "restaurant-outline",
  },
];
