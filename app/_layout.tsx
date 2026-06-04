import { Slot } from "expo-router";

import Toast from "react-native-toast-message";

import { ThemeProvider } from "@/src/contexts/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Slot />
      <Toast />
    </ThemeProvider>
  );
}
