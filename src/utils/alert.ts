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
  confirmButtonVariant,
  onConfirm,
  onCancel,
}: {
  type?: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonVariant?: "success" | "error" | "warning" | "info";
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}) {
  getAlertRef()?.showAlert({
    variant: "confirm",
    type,
    title,
    message,
    confirmText,
    cancelText,
    confirmButtonVariant,
    onConfirm,
    onCancel,
  });
}

function confirmAsync(params: {
  type?: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonVariant?: "success" | "error" | "warning" | "info";
}) {
  return new Promise<boolean>((resolve) => {
    getAlertRef()?.showAlert({
      variant: "confirm",
      ...params,
      resolve,
    });
  });
}

export async function confirmAlert({
  type,
  title,
  message,
  confirmText,
  cancelText,
  confirmButtonVariant,
}: {
  type?: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonVariant?: "success" | "error" | "warning" | "info";
}) {
  return confirmAsync({
    type,
    title,
    message,
    confirmText,
    cancelText,
    confirmButtonVariant,
  });
}
