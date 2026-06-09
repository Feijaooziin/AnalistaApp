import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import { useToastConfig } from "@/src/components/ToastConfig";
import { ThemeProvider } from "@/src/contexts/ThemeContext";
import { initDB } from "@/src/database/migrations";
import Toast from "react-native-toast-message";

function AppContent() {
  const toastConfig = useToastConfig();

  return (
    <>
      <StatusBar style="dark" />
      <Slot />
      <Toast config={toastConfig} visibilityTime={2500} topOffset={110} />
    </>
  );
}

export default function RootLayout() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
