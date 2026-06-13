import ScreenContainer from "@/src/components/layout/ScreenContainer";
import AppButton from "@/src/components/ui/AppButton";
import AppCard from "@/src/components/ui/AppCard";
import AppInput from "@/src/components/ui/AppInput";
import DateTimeInput from "@/src/components/ui/DateTimeInput";
import PickerInput from "@/src/components/ui/PickerInput";
import SectionTitle from "@/src/components/ui/SectionTitle";
import { JBS_CARGOS } from "@/src/modules/jbs/constants/jbs";
import { openPicker } from "@/src/services/picker/openPicker";
import { useState } from "react";
import { View } from "react-native";

export default function Home() {
  const [cargo, setCargo] = useState("a");
  return (
    <ScreenContainer header={{ title: "ECLA Hub", toggleTheme: true }}>
      <View style={{ gap: 16 }}>
        <SectionTitle title="Testes" subtitle="Estou testando algumas coisas" />

        <AppCard title="Teste" value="Teste" />
        <AppButton title="Teste" leftIcon="ecla-icon" rightIcon="ecla-icon" />
        <AppButton
          title="Remove"
          leftIcon="logo-jbs"
          rightIcon="logo-seara"
          variant="danger"
        />

        <AppInput label="Teste" clearable />

        <DateTimeInput label="Data" />
        <PickerInput
          label="Cargo"
          value={cargo}
          options={JBS_CARGOS}
          onPress={() =>
            openPicker({
              title: "Cargo",
              value: cargo,
              options: JBS_CARGOS,
              onSelect: setCargo,
            })
          }
        />
      </View>
    </ScreenContainer>
  );
}
