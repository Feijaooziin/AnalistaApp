// import { Ionicons } from "@expo/vector-icons";
// import { ComponentProps } from "react";

// type IconName = ComponentProps<typeof Ionicons>["name"];

// export type MenuItem = {
//   label: string;
//   route: string;
//   icon?: IconName;
// };

// export const drawerMenu: MenuItem[] = [
//   {
//     label: "Home",
//     route: "home",
//     icon: "home-outline",
//   },
//   {
//     label: "ECLA",
//     route: "ecla",
//     icon: "business-outline",
//   },
//   {
//     label: "JBS",
//     route: "jbs",
//     icon: "cube-outline",
//   },
//   {
//     label: "Seara",
//     route: "seara",
//     icon: "restaurant-outline",
//   },
// ];

import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";

type IconName = ComponentProps<typeof Ionicons>["name"];

export type DrawerItem = {
  label: string;
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
    route: "home",
    icon: "home-outline",
  },

  {
    label: "ECLA",
    icon: "business-outline",
    children: [
      {
        label: "Principal",
        route: "ecla",
        icon: "business-outline",
      },
      {
        label: "Dash",
        route: "ecla/dashboard",
        icon: "business-outline",
      },
      {
        label: "Ferramentas",
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
        route: "jbs",
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
        route: "seara",
        icon: "restaurant-outline",
      },
    ],
  },
];
