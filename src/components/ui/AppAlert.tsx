import { Text, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import AppButton from "./AppButton";
import AppModal from "./AppModal";

interface AppAlertProps {
  visible: boolean;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose: () => void;
}

export default function AppAlert({
  visible,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  onClose,
}: AppAlertProps) {
  const { colors } = useTheme();

  function handleCancel() {
    onCancel?.();
    onClose();
  }

  function handleConfirm() {
    onConfirm?.();
    onClose();
  }
  return (
    <AppModal visible={visible} onClose={onClose}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 40,
            marginBottom: 16,
          }}
        >
          ⚠️
        </Text>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            textAlign: "center",
            marginBottom: 12,
            color: colors.text,
          }}
        >
          {title}
        </Text>

        {!!message && (
          <Text
            style={{
              textAlign: "center",
              color: colors.textSecondary,
            }}
          >
            {message}
          </Text>
        )}

        <View
          style={{
            flexDirection: "row",
            gap: 12,
            marginTop: 24,
            width: "100%",
          }}
        >
          <View style={{ flex: 1 }}>
            <AppButton
              title={cancelText}
              variant="outline"
              onPress={handleCancel}
            />
          </View>

          <View style={{ flex: 1 }}>
            <AppButton title={confirmText} onPress={handleConfirm} />
          </View>
        </View>
      </View>
    </AppModal>
  );
}
