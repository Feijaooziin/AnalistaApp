import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { COLORS } from "../constants/colors";

interface Props {
  motivos: string[];
  selecionados: string[];
  onChange: (motivos: string[]) => void;

  required?: boolean;
  error?: string;
}

export function MotivosSelector({
  motivos,
  selecionados,
  onChange,
  required,
  error,
}: Props) {
  function toggleMotivo(motivo: string) {
    const existe = selecionados.includes(motivo);

    onChange(
      existe
        ? selecionados.filter((item) => item !== motivo)
        : [...selecionados, motivo],
    );
  }

  function renderMotivo(motivo: string) {
    const isSelected = selecionados.includes(motivo);

    return (
      <Pressable
        key={motivo}
        onPress={() => toggleMotivo(motivo)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <View
          style={{
            width: 22,
            height: 22,
            borderWidth: 1,
            borderRadius: 4,
            marginRight: 10,
            alignItems: "center",
            justifyContent: "center",

            borderColor: isSelected ? COLORS.primary : COLORS.border,

            backgroundColor: isSelected ? COLORS.primary : COLORS.surface,
          }}
        >
          {isSelected && (
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
          )}
        </View>

        <Text
          style={{
            color: COLORS.text,
          }}
        >
          {motivo}
        </Text>
      </Pressable>
    );
  }

  return (
    <View
      style={{
        marginBottom: 16,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: error ? COLORS.danger : COLORS.primary,
          marginBottom: 8,
        }}
      >
        Motivos
        {required && (
          <Text
            style={{
              color: COLORS.danger,
            }}
          >
            {" *"}
          </Text>
        )}
      </Text>

      <View
        style={{
          borderWidth: error ? 1 : 0,
          borderColor: COLORS.danger,
          borderRadius: 10,
          padding: error ? 12 : 0,
          backgroundColor: error ? COLORS.errorBackground : undefined,
        }}
      >
        {motivos.map(renderMotivo)}
      </View>

      {!!error && (
        <Text
          style={{
            color: COLORS.danger,
            fontSize: 12,
            marginTop: 4,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}
