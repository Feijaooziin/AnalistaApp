import { router, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import DrawerGroup from "@/src/components/drawer/DrawerGroup";
import { drawerMenu } from "@/src/constants/drawerMenu";
import { useTheme } from "@/src/contexts/ThemeContext";
import { ICON_SIZE } from "@/src/theme/layout";
import AppIcon from "../icons/AppIcon";

export default function CustomDrawerContent() {
  const { colors } = useTheme();
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  function getCurrentGroup(pathname: string) {
    if (pathname.startsWith("/jbs")) return "JBS";
    if (pathname.startsWith("/ecla")) return "ECLA";
    if (pathname.startsWith("/seara")) return "SEARA";
    return null;
  }

  useEffect(() => {
    const currentGroup = getCurrentGroup(pathname);

    if (!currentGroup) {
      setOpenGroup(null);
      return;
    }

    setOpenGroup(currentGroup);
  }, [pathname]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.surface,
      }}
    >
      <View
        style={{
          paddingTop: 60,
          paddingBottom: 20,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: colors.text,
          }}
        >
          Analista App
        </Text>

        <Text
          style={{
            color: colors.textMuted,
            marginTop: 4,
          }}
        >
          Emergent Cold LATAM
        </Text>
      </View>

      <View style={{ padding: 12 }}>
        {drawerMenu.map((item) => {
          if ("children" in item) {
            return (
              <DrawerGroup
                key={item.label}
                label={item.label}
                icon={item.icon}
                children={item.children}
                groupKey={item.label}
                openGroup={openGroup}
                setOpenGroup={setOpenGroup}
              />
            );
          }

          const active = pathname === `/${item.route}`;

          return (
            <TouchableOpacity
              key={item.route}
              onPress={() => router.push(`/${item.route}` as any)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 14,
                borderRadius: 12,
                marginBottom: 6,
                backgroundColor: active ? colors.primary : "transparent",
              }}
            >
              <AppIcon
                name={item.icon}
                size={ICON_SIZE.md}
                color={active ? colors.drawerTextFocused : colors.drawerText}
              />

              <Text
                style={{
                  marginLeft: 12,
                  fontWeight: "600",
                  color: active ? colors.drawerTextFocused : colors.drawerText,
                }}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View
        style={{
          marginTop: "auto",
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: colors.textMuted,
          }}
        >
          Analista App • v1.0.0
        </Text>
      </View>
    </View>
  );
}
