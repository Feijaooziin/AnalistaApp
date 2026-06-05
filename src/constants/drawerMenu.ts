import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";

type IconName = ComponentProps<typeof Ionicons>["name"];

export type DrawerItem = {
  label: string;
  title: string;
  route: string;
  icon: IconName;
};

export type DrawerGroup = {
  label: string;
  icon: IconName;
  children: DrawerItem[];
};

export type DrawerMenuItem = DrawerItem | DrawerGroup;

export const drawerMenu: DrawerMenuItem[] = [
  {
    label: "Home",
    title: "Home",
    route: "home",
    icon: "home-outline",
  },

  {
    label: "ECLA",
    icon: "business-outline",
    children: [
      {
        label: "Principal",
        title: "Emergent Cold LATAM",
        route: "ecla",
        icon: "business-outline",
      },
      {
        label: "Dashboard",
        title: "Dashboard",
        route: "ecla/dashboard",
        icon: "business-outline",
      },
      {
        label: "Ferramentas",
        title: "Ferramentas",
        route: "ecla/tools",
        icon: "business-outline",
      },
    ],
  },

  {
    label: "JBS",
    icon: "cube-outline",
    children: [
      {
        label: "Principal",
        title: "JBS",
        route: "jbs",
        icon: "cube-outline",
      },
      {
        label: "Funcionários",
        title: "Funcionários",
        route: "jbs/funcionarios",
        icon: "cube-outline",
      },
    ],
  },

  {
    label: "Seara",
    icon: "restaurant-outline",
    children: [
      {
        label: "Principal",
        title: "Seara",
        route: "seara",
        icon: "restaurant-outline",
      },
    ],
  },
];
