import { Ionicons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import { useRef, useState } from "react";
import { Alert, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AdvertenciaForm } from "../components/AdvertenciaForm";
import { Button } from "../components/Button";
import Header from "../components/Header";
import { gerarPDF } from "../services/pdfService";
import { AdvertenciaData } from "../types/advertencia";
import { showError } from "../utils/toast";

export default function Advertencia() {
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
          onPress: () => setData(initialData),
        },
      ],
    );
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "#F8FAFC",
        }}
      >
        <Header />
        <KeyboardAwareScrollView
          ref={scrollRef}
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={300}
        >
          <View
            style={{
              backgroundColor: "#FFFFFF",
              marginHorizontal: 16,
              marginTop: 15,
              borderRadius: 16,
              padding: 16,
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <AdvertenciaForm
              data={data}
              setData={setData}
              errors={errors}
              clearError={clearError}
            />
          </View>

          <Button
            title="Limpar Formulário"
            variant="danger"
            onPress={confirmarLimpeza}
            style={{
              marginHorizontal: 16,
              marginTop: 20,
            }}
            icon={<Ionicons name="trash" size={20} color="#B91C1C" />}
          />

          <Button
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
            icon={<Ionicons name="document-text" size={20} color="#FFFFFF" />}
          />
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}
