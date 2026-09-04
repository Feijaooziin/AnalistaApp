import { Drawer } from "expo-router/drawer";

import CustomDrawerContent from "@/src/components/drawer/CustomDrawerContent";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={() => <CustomDrawerContent />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="home" />
      <Drawer.Screen name="ecla" />
      <Drawer.Screen name="jbs" />
      <Drawer.Screen name="seara" />
      <Drawer.Screen name="settings" />
    </Drawer>
  );
}
