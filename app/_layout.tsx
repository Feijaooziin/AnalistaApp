import { Slot } from "expo-router";
import { useEffect } from "react";

import Toast from "react-native-toast-message";

import { ThemeProvider } from "@/src/contexts/ThemeContext";
import { initDB } from "@/src/database/migrations";

export default function RootLayout() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <ThemeProvider>
      <Slot />
      <Toast />
    </ThemeProvider>
  );
}
