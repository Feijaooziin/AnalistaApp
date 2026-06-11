import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";

type IconName =
  | ComponentProps<typeof Ionicons>["name"]
  | "ecla-icon"
  | "ecla-pin"
  | "ecla-pin-circle"
  | "logo-ecla"
  | "logo-jbs"
  | "logo-seara";

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
    icon: "ecla-icon",
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
        icon: "warning-outline",
      },
    ],
  },

  {
    label: "JBS",
    icon: "ecla-icon",
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
        icon: "stats-chart-outline",
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
    icon: "ecla-icon",
    children: [
      {
        label: "Principal",
        title: "Seara",
        route: "seara",
        icon: "restaurant-outline",
      },
    ],
  },

  {
    label: "Ferramentas",
    icon: "hammer-outline",
    children: [
      {
        label: "Email Rápido",
        title: "Email Rápido",
        route: "tools/quickEmail",
        icon: "mail-outline",
      },
    ],
  },

  {
    label: "Sobre",
    title: "Sobre",
    route: "about",
    icon: "information-circle-outline",
  },
];
