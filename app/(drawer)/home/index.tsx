import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";
import AppButton from "@/src/components/ui/AppButton";
import AppCard from "@/src/components/ui/AppCard";
import AppInput from "@/src/components/ui/AppInput";
import DateTimeInput from "@/src/components/ui/DateTimeInput";
import PickerInput from "@/src/components/ui/PickerInput";
import { JBS_CARGOS } from "@/src/modules/jbs/constants/jbs";
import { showSuccess } from "@/src/utils/toast";
import { useState } from "react";
import { View } from "react-native";

export default function Home() {
  const size = "lg";
  const [cargo, setCargo] = useState("a");
  return (
    <ScreenContainer header={{ title: "ECLA Hub", toggleTheme: true }}>
      <View style={{ gap: 16 }}>
        <PageContext title="Testes" subtitle="Estou testando algumas coisas" />

        <AppCard title="Teste" value={"Testando"} copyable size={size} />

        <AppButton
          title="Teste"
          leftIcon="ecla-icon"
          rightIcon="ecla-icon"
          size={size}
        />
        <AppButton
          title="Remove"
          leftIcon="logo-jbs"
          rightIcon="logo-seara"
          size={"sm"}
          variant="danger"
        />

        <AppInput label="Teste" clearable size={size} />

        <DateTimeInput label="Data" size={size} />
        <PickerInput
          label="Cargo"
          value={cargo}
          size={size}
          options={JBS_CARGOS}
          onPress={() => showSuccess("", "")}
          required
        />
      </View>
    </ScreenContainer>
  );
}
