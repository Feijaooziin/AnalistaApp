import AppSearchInput from "@/src/components/AppSearchInput";
import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";
import { useState } from "react";
import { View } from "react-native";

export default function Home() {
  const [search, setSearch] = useState("");
  const [size, setSize] = useState("md" as any);
  const sizes = [
    { label: "Pequeno", value: "sm", gap: 12 },
    { label: "Médio", value: "md", gap: 12 },
    { label: "Grande", value: "lg", gap: 12 },
  ];
  return (
    <ScreenContainer header={{ title: "ECLA Hub", toggleTheme: true }}>
      <PageContext
        title="Testes"
        subtitle="Tela temporária para testes"
        size={size}
      />
      <View style={{ gap: size === "sm" ? 8 : 16 }}>
        <AppSearchInput
          label="Buscar colaborador"
          value={search}
          onChangeText={setSearch}
          size={size}
        />
      </View>
    </ScreenContainer>
  );
}
