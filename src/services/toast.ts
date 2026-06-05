import Toast from "react-native-toast-message";

export function showSuccess(message: string, visibilityTime = 3000) {
  Toast.show({
    type: "success",
    text1: "Sucesso",
    text2: message,
    visibilityTime,
  });
}

export function showError(message: string, visibilityTime = 4000) {
  Toast.show({
    type: "error",
    text1: "Erro",
    text2: message,
    visibilityTime,
  });
}

export function showInfo(message: string, visibilityTime = 3000) {
  Toast.show({
    type: "info",
    text1: "Informação",
    text2: message,
    visibilityTime,
  });
}
