import { getAlertRef } from "@/src/contexts/AlertContext";

export function showSuccessAlert(title: string, message?: string) {
  getAlertRef()?.showAlert({
    type: "success",
    title,
    message,
  });
}

export function showErrorAlert(title: string, message?: string) {
  getAlertRef()?.showAlert({
    type: "error",
    title,
    message,
  });
}

export function showInfoAlert(title: string, message?: string) {
  getAlertRef()?.showAlert({
    type: "info",
    title,
    message,
  });
}

export function showWarningAlert(title: string, message?: string) {
  getAlertRef()?.showAlert({
    type: "warning",
    title,
    message,
  });
}

export function showConfirmAlert({
  type,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: {
  type?: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}) {
  getAlertRef()?.showAlert({
    variant: "confirm",
    type,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
  });
}
