import { usePathname } from "expo-router";
import { Drawer } from "expo-router/drawer";

import Header from "@/src/components/Header";
import CustomDrawerContent from "@/src/components/drawer/CustomDrawerContent";

import { getRouteTitle } from "@/src/utils/getRouteTitle";

export default function DrawerLayout() {
  const pathname = usePathname();

  const title = getRouteTitle(pathname);

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
