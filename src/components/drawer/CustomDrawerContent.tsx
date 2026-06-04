import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

import { Text, TouchableOpacity, View } from "react-native";

import DrawerGroup from "@/src/components/drawer/DrawerGroup";
import { drawerMenu } from "@/src/constants/drawerMenu";
import { useTheme } from "@/src/contexts/ThemeContext";

export default function CustomDrawerContent() {
  const pathname = usePathname();

  const { colors } = useTheme();

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
            color: colors.textSecondary,
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

                backgroundColor: active ? `${colors.primary}20` : "transparent",
              }}
            >
              <Ionicons
                name={item.icon}
                size={22}
                color={active ? colors.primary : colors.text}
              />

              <Text
                style={{
                  marginLeft: 12,
                  fontWeight: "600",

                  color: active ? colors.primary : colors.text,
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
            color: colors.textSecondary,
          }}
        >
          Analista App • v1.0.0
        </Text>
      </View>
    </View>
  );
}
