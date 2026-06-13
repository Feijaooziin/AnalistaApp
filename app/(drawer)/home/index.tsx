import AppBadge from "@/src/components/AppBadge";
import AppListItem from "@/src/components/AppListItem";
import AppSearchInput from "@/src/components/AppSearchInput";
import AppIcon from "@/src/components/icons/AppIcon";
import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";
import PickerInput from "@/src/components/PickerInput";
import { openPicker } from "@/src/services/picker/openPicker";
import { useState } from "react";
import { View } from "react-native";

export default function Home() {
  const [search, setSearch] = useState("");
  const [size, setSize] = useState("" as any);
  const sizes = [
    { label: "Maçã", value: "Maçã" },
    { label: "Abacaxi", value: "Abacaxi" },
    { label: "Melancia", value: "Melancia" },
  ];
  return (
    <ScreenContainer header={{ title: "ECLA Hub", toggleTheme: true }}>
      <PageContext title="Testes" subtitle="Tela temporária para testes" />
      <View style={{ gap: 4 }}>
        <AppSearchInput
          label="Buscar colaborador"
          value={search}
          onChangeText={setSearch}
        />

        <PickerInput
          label="Teste"
          value={size}
          options={sizes}
          onPress={() =>
            openPicker({
              title: "Tamanho",
              value: size,
              options: sizes,
              onSelect: setSize,
            })
          }
        />

        <AppBadge label="Ativo" variant="success" />
        <AppBadge label="Desligado" variant="danger" size="lg" />
        <AppBadge label="JBS" variant="primary" size="sm" />

        <AppListItem
          title="Tema"
          subtitle="Escuro"
          leftComponent={<AppIcon name="moon-outline" />}
        />
      </View>
    </ScreenContainer>
  );
}
