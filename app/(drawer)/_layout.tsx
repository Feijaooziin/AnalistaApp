import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: "Home",
          title: "Home",
        }}
      />

      <Drawer.Screen
        name="ecla"
        options={{
          drawerLabel: "ECLA",
          title: "ECLA",
        }}
      />

      <Drawer.Screen
        name="jbs"
        options={{
          drawerLabel: "JBS",
          title: "JBS",
        }}
      />

      <Drawer.Screen
        name="seara"
        options={{
          drawerLabel: "Seara",
          title: "Seara",
        }}
      />
    </Drawer>
  );
}
