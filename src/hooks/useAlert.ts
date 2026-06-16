import { useState } from "react";

export type AlertType = "info" | "success" | "warning" | "error";

interface AlertState {
  visible: boolean;
  title: string;
  message?: string;
  type: AlertType;
  variant: "simple" | "confirm";
}

export function useAlert() {
  const [alert, setAlert] = useState<AlertState>({
    visible: false,
    title: "",
    type: "info",
    variant: "simple",
  });

  function showAlert(data: Omit<AlertState, "visible">) {
    setAlert({
      visible: true,
      ...data,
    });
  }

  function closeAlert() {
    setAlert((prev) => ({
      ...prev,
      visible: false,
    }));
  }

  return {
    alert,
    showAlert,
    closeAlert,
  };
}
