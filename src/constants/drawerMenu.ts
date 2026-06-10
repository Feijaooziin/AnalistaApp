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
        label: "Advertencias",
        title: "Advertencias",
        route: "ecla/advertencia",
        icon: "business-outline",
      },
    ],
  },

  {
    label: "JBS",
    icon: "cube-outline",
    children: [
      {
        label: "Funcionários",
        title: "Funcionários",
        route: "jbs/funcionarios",
        icon: "people-outline",
      },
      {
        label: "Status Operacional",
        title: "Status Operacional",
        route: "jbs/statusJBS",
        icon: "business-outline",
      },
      {
        label: "Criar Emails",
        title: "Criar Emails",
        route: "jbs/createEmails",
        icon: "mail-outline",
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
