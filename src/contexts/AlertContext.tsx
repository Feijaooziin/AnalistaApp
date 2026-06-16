import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
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
}

interface ShowAlertParams {
  type?: AlertType;
  variant?: AlertVariant;
  title: string;
  message?: string;
}

interface AlertContextData {
  showAlert: (params: ShowAlertParams) => void;
  closeAlert: () => void;
}

const AlertContext = createContext({} as AlertContextData);

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
    }: ShowAlertParams) => {
      setAlert({
        visible: true,
        type,
        variant,
        title,
        message,
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
        onClose={closeAlert}
      />
    </AlertContext.Provider>
  );
}

export function useAlertContext() {
  return useContext(AlertContext);
}
