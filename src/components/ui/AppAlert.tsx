import { Text, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import AppIcon from "../icons/AppIcon";
import AppButton from "./AppButton";
import AppModal from "./AppModal";

type AlertType = "info" | "success" | "warning" | "error";

interface AppAlertProps {
  visible: boolean;
  type?: AlertType;
  variant?: "simple" | "confirm";
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonVariant?: AlertType;
  confirmLoading?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose: () => void;
}

export default function AppAlert({
  visible,
  type = "info",
  variant = "simple",
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmButtonVariant,
  confirmLoading = false,
  onConfirm,
  onCancel,
  onClose,
}: AppAlertProps) {
  const { colors } = useTheme();

  const alertConfig = {
    success: {
      icon: "checkmark-circle",
      color: colors.success,
    },

    error: {
      icon: "close-circle",
      color: colors.error,
    },

    info: {
      icon: "alert-circle",
      color: colors.info,
    },

    warning: {
      icon: "warning",
      color: colors.warning,
    },
  };

  const currentAlert = alertConfig[type];
  const confirmButtonColor = alertConfig[confirmButtonVariant ?? type].color;

  function handleCancel() {
    if (confirmLoading) return;

    onCancel?.();
    onClose();
  }

  function handleConfirm() {
    if (confirmLoading) return;
    onConfirm?.();
    onClose();
  }

  return (
    <AppModal visible={visible} onClose={confirmLoading ? () => {} : onClose}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        {variant === "simple" && (
          <AppIcon
            name={currentAlert.icon}
            size={48}
            color={currentAlert.color}
          />
        )}

        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            textAlign: "center",
            marginTop: variant === "simple" ? 12 : 0,
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

        {variant === "simple" ? (
          <View
            style={{
              marginTop: 24,
              width: "100%",
            }}
          >
            <AppButton
              title="OK"
              onPress={onClose}
              style={{ backgroundColor: currentAlert.color }}
            />
          </View>
        ) : (
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
              <AppButton
                title={confirmText}
                loading={confirmLoading}
                onPress={handleConfirm}
                style={{ backgroundColor: confirmButtonColor }}
              />
            </View>
          </View>
        )}
      </View>
    </AppModal>
  );
}
