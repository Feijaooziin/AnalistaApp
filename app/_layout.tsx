import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import Toast from "react-native-toast-message";

import { toastConfig } from "@/src/components/ToastConfig";
import { ThemeProvider } from "@/src/contexts/ThemeContext";
import { initDB } from "@/src/database/migrations";

export default function RootLayout() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <ThemeProvider>
      <StatusBar style="dark" />
      <Slot />
      <Toast config={toastConfig} />
    </ThemeProvider>
  );
}
