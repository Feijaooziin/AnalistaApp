import * as Sharing from "expo-sharing";
import { useRef, useState } from "react";
import { Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import PageContext from "@/src/components/layout/PageContext";
import ScreenContainer from "@/src/components/layout/ScreenContainer";
import AppButton from "@/src/components/ui/AppButton";
import { useTheme } from "@/src/contexts/ThemeContext";
import { AdvertenciaForm } from "@/src/modules/advertencia/components/AdvertenciaForm";
import { gerarPDF } from "@/src/modules/advertencia/services/pdfService";
import { AdvertenciaData } from "@/src/modules/advertencia/types/advertencia";
import { showError, showInfo } from "@/src/utils/toast";

export default function Advertencia() {
  const { colors } = useTheme();
  const scrollRef = useRef<KeyboardAwareScrollView>(null);

  const initialData: AdvertenciaData = {
    funcionario: "",
    admissao: undefined,
    numeroAdvertencia: 1,
    tipoDocumento: "ADVERTENCIA",
    motivos: [],
    observacoes: "",
    dataOcorrido: new Date(),
    dataAssinatura: new Date(),
    cidade: "",
  };

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function clearError(field: string) {
    setErrors((prev) => {
      const next = { ...prev };

      delete next[field];

      return next;
    });
  }

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};

    if (!data.funcionario.trim()) {
      novosErros.funcionario = "Informe o nome do funcionário";
    }

    if (data.motivos.length === 0) {
      novosErros.motivos = "Selecione pelo menos um motivo";
    }

    setErrors(novosErros);
    const possuiErros = Object.keys(novosErros).length > 0;

    if (possuiErros) {
      showError(
        "Campos obrigatórios",
        "Preencha todos os campos obrigatórios.",
      );
      scrollRef.current?.scrollToPosition?.(0, 0, true);
    }

    return !possuiErros;
  };

  const handleGerarDocumento = async () => {
    if (!validarFormulario()) {
      return;
    }

    try {
      const caminho = await gerarPDF(data);
      const disponivel = await Sharing.isAvailableAsync();

      if (disponivel) {
        await Sharing.shareAsync(caminho);
      }
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      Alert.alert("Erro", "Não foi possível gerar o documento.");
    }
  };

  const confirmarLimpeza = () => {
    Alert.alert(
      "Limpar formulário",
      "Deseja realmente limpar todos os campos?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Limpar",
          style: "destructive",
          onPress: () => {
            setData(initialData);
            setErrors({});
            showInfo("Limpar", "Todos os campos foram resetados.");
            scrollRef.current?.scrollToPosition?.(0, 0, true);
          },
        },
      ],
    );
  };

  return (
    <ScreenContainer header={{ title: "Advertencias", toggleTheme: true }}>
      <KeyboardAwareScrollView
        ref={scrollRef}
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={300}
      >
        <PageContext
          title="Advertências"
          subtitle="Gere advertências e suspensões em PDF."
        />
        <AdvertenciaForm
          data={data}
          setData={setData}
          errors={errors}
          clearError={clearError}
        />

        <AppButton
          title="Limpar Formulário"
          variant="danger"
          onPress={confirmarLimpeza}
          style={{
            marginHorizontal: 16,
            marginTop: 20,
          }}
          leftIcon="trash-bin-outline"
        />

        <AppButton
          title={
            data.tipoDocumento === "ADVERTENCIA"
              ? "Gerar Advertência"
              : "Gerar Suspensão"
          }
          onPress={handleGerarDocumento}
          style={{
            marginHorizontal: 16,
            marginTop: 12,
            marginBottom: 32,
          }}
          leftIcon="document-text"
        />
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
}
