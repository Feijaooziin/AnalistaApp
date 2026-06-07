import { Ionicons } from "@expo/vector-icons";

import { Text, TouchableOpacity, View } from "react-native";

import { useState } from "react";

import { router, usePathname } from "expo-router";

import { useTheme } from "@/src/contexts/ThemeContext";
import { ICON_SIZE } from "@/src/theme/layout";

export default function DrawerGroup({ label, icon, children }: any) {
  const { colors } = useTheme();

  const pathname = usePathname();

  const groupActive = children.some(
    (child: any) => pathname === `/${child.route}`,
  );

  const [open, setOpen] = useState(groupActive);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setOpen(!open)}
        style={{
          padding: 14,
          borderRadius: 12,

          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",

          marginBottom: 4,

          backgroundColor: groupActive ? colors.primary : "transparent",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name={icon}
            size={ICON_SIZE.md}
            color={groupActive ? colors.drawerTextFocused : colors.drawerText}
          />

          <Text
            style={{
              marginLeft: 12,
              fontWeight: "600",
              color: groupActive ? colors.drawerTextFocused : colors.drawerText,
            }}
          >
            {label}
          </Text>
        </View>

        <Ionicons
          name={open ? "chevron-down" : "chevron-forward"}
          size={ICON_SIZE.sm}
          color={colors.drawerText}
        />
      </TouchableOpacity>

      {open && (
        <View
          style={{
            paddingLeft: 24,
          }}
        >
          {children.map((item: any) => {
            const active = pathname === `/${item.route}`;

            return (
              <TouchableOpacity
                key={item.route}
                onPress={() => router.push(`/${item.route}` as any)}
                style={{
                  padding: 12,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: active ? colors.primary : "transparent",
                }}
              >
                <Ionicons
                  name={icon}
                  size={ICON_SIZE.sm}
                  color={active ? colors.drawerTextFocused : colors.drawerText}
                />
                <Text
                  style={{
                    color: active
                      ? colors.drawerTextFocused
                      : colors.drawerText,
                    marginLeft: 8,
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}
