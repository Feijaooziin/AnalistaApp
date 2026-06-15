import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";
import AppBadge from "@/src/components/ui/AppBadge";
import AppButton from "@/src/components/ui/AppButton";
import AppInput from "@/src/components/ui/AppInput";
import AppPicker from "@/src/components/ui/AppPicker";
import AppSearchInput from "@/src/components/ui/AppSearchInput";
import AppSectionCard from "@/src/components/ui/AppSectionCard";
import DateTimeInput from "@/src/components/ui/DateTimeInput";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function Home() {
  const [search, setSearch] = useState("");
  const [fruit, setFruit] = useState("" as any);
  const fruits = [
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

        <View style={{ flexDirection: "row", gap: 6, marginBottom: 6 }}>
          <AppBadge label="Ativo" variant="success" />
          <AppBadge label="Desligado" variant="danger" />
          <AppBadge label="JBS" variant="primary" />
        </View>

        <AppSectionCard
          title="Dados pessoais"
          subtitle="Dados do doidão"
          collapsible
        >
          <AppInput label="Nome" />
          <AppInput label="Email" />
          <DateTimeInput label="Data de nascimento" />
        </AppSectionCard>

        <AppBadge label="Modal" variant="primary" />
        <AppPicker
          label="Melhor fruta"
          value={fruit}
          options={fruits}
          onValueChange={setFruit}
        />

        <AppBadge label="BottomSheet" variant="primary" />
        <AppPicker
          type="bottomSheet"
          label="Melhor fruta"
          value={fruit}
          options={fruits}
          onValueChange={setFruit}
        />

        <AppButton
          title="Modais"
          onPress={() => router.push("/dev/modal-playground")}
        />
      </View>
    </ScreenContainer>
  );
}
