import { useTheme } from "@/src/contexts/ThemeContext";
import { ICON_SIZE } from "@/src/theme/layout";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

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
  const { colors } = useTheme();

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
            borderColor: isSelected ? colors.primary : colors.border,
            backgroundColor: isSelected ? colors.primary : colors.surface,
          }}
        >
          {isSelected && (
            <Ionicons name="checkmark" size={ICON_SIZE.sm} color="#FFFFFF" />
          )}
        </View>

        <Text
          style={{
            color: error ? colors.danger : colors.text,
            fontWeight: isSelected ? "900" : "400",
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
          color: error ? colors.danger : colors.textSecondary,
          marginBottom: 8,
        }}
      >
        Motivos
        {required && (
          <Text
            style={{
              color: colors.danger,
            }}
          >
            {" *"}
          </Text>
        )}
      </Text>

      <View
        style={{
          borderWidth: error ? 1 : 0,
          borderColor: colors.danger,
          borderRadius: 10,
          padding: 6,
          backgroundColor: error ? colors.errorBackground : undefined,
        }}
      >
        {motivos.map(renderMotivo)}
      </View>

      {!!error && (
        <Text
          style={{
            color: colors.danger,
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
