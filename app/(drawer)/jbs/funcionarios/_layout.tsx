import { useTheme } from "@/src/contexts/ThemeContext";
import { Stack } from "expo-router";

export default function FuncionariosLayout() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Funcionários",
        }}
      />

      <Stack.Screen
        name="novo"
        options={{
          title: "Novo Funcionário",
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          title: "Detalhes",
        }}
      />
    </Stack>
  );
}
