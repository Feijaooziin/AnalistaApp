import { usePathname } from "expo-router";
import { Drawer } from "expo-router/drawer";

import Header from "@/src/components/Header";

import CustomDrawerContent from "@/src/components/drawer/CustomDrawerContent";

import { ROUTE_TITLES } from "@/src/constants/routes";

export default function DrawerLayout() {
  const pathname = usePathname();

  const routeKey = pathname.replace("/", "");

  const title = ROUTE_TITLES[routeKey] ?? "Analista App";

  return (
    <Drawer
      drawerContent={() => <CustomDrawerContent />}
      screenOptions={{
        header: () => <Header title={title} />,
      }}
    >
      <Drawer.Screen name="home" />
      <Drawer.Screen name="ecla" />
      <Drawer.Screen name="jbs" />
      <Drawer.Screen name="seara" />
    </Drawer>
  );
}
