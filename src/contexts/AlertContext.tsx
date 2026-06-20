import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import AppAlert from "@/src/components/ui/AppAlert";

export type AlertType = "success" | "error" | "warning" | "info";

export type AlertVariant = "simple" | "confirm";

interface AlertState {
  visible: boolean;
  type: AlertType;
  variant: AlertVariant;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonVariant?: AlertType;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  resolve?: (value: boolean) => void;
}

interface ShowAlertParams {
  type?: AlertType;
  variant?: AlertVariant;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonVariant?: AlertType;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  resolve?: (value: boolean) => void;
}

interface AlertContextData {
  showAlert: (params: ShowAlertParams) => void;
  closeAlert: () => void;
}

const AlertContext = createContext({} as AlertContextData);

let alertRef: AlertContextData | null = null;

export function setAlertRef(ref: AlertContextData | null) {
  alertRef = ref;
}

export function getAlertRef() {
  return alertRef;
}

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<AlertState>({
    visible: false,
    type: "info",
    variant: "simple",
    title: "",
  });

  const showAlert = useCallback(
    ({
      type = "info",
      variant = "simple",
      title,
      message,
      confirmText,
      cancelText,
      confirmButtonVariant,
      onConfirm,
      onCancel,
      resolve,
    }: ShowAlertParams) => {
      setAlert({
        visible: true,
        type,
        variant,
        title,
        message,
        confirmText,
        cancelText,
        confirmButtonVariant,
        onConfirm,
        onCancel,
        resolve,
      });
    },
    [],
  );

  const closeAlert = useCallback(() => {
    setAlert((prev) => ({
      ...prev,
      visible: false,
    }));
  }, []);

  useEffect(() => {
    setAlertRef({
      showAlert,
      closeAlert,
    });

    return () => {
      setAlertRef(null);
    };
  }, [showAlert, closeAlert]);

  return (
    <AlertContext.Provider
      value={{
        showAlert,
        closeAlert,
      }}
    >
      {children}

      <AppAlert
        visible={alert.visible}
        type={alert.type}
        variant={alert.variant}
        title={alert.title}
        message={alert.message}
        confirmText={alert.confirmText}
        cancelText={alert.cancelText}
        confirmButtonVariant={alert.confirmButtonVariant}
        onConfirm={alert.onConfirm}
        onCancel={alert.onCancel}
        onClose={closeAlert}
        resolve={alert.resolve}
      />
    </AlertContext.Provider>
  );
}

export function useAlertContext() {
  return useContext(AlertContext);
}
