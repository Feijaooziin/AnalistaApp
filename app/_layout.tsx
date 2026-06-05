import { Slot } from "expo-router";

import Toast from "react-native-toast-message";

import { ThemeProvider } from "@/src/contexts/ThemeContext";
import { initDB } from "@/src/database/migrations";
import { useEffect } from "react";

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
