import { Ionicons } from "@expo/vector-icons";

import { Text, TouchableOpacity, View } from "react-native";

import { useState } from "react";

import { router, usePathname } from "expo-router";

import { useTheme } from "@/src/contexts/ThemeContext";

export default function DrawerGroup({ label, icon, children }: any) {
  const { colors } = useTheme();

  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const groupActive = children.some(
    (child: any) => pathname === `/${child.route}`,
  );

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

          backgroundColor: groupActive ? `${colors.primary}20` : "transparent",
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
            size={22}
            color={groupActive ? colors.primary : colors.text}
          />

          <Text
            style={{
              marginLeft: 12,
              fontWeight: "600",
              color: groupActive ? colors.primary : colors.text,
            }}
          >
            {label}
          </Text>
        </View>

        <Ionicons
          name={open ? "chevron-down" : "chevron-forward"}
          size={18}
          color={colors.text}
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
                }}
              >
                <Text
                  style={{
                    color: active ? colors.primary : colors.text,
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
