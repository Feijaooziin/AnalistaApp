import * as Haptics from "expo-haptics";
import Toast from "react-native-toast-message";

export function showSuccess(title: string, message: string) {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  Toast.show({
    type: "success",
    text1: title,
    text2: message,
  });
}

export function showError(title: string, message: string) {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  Toast.show({
    type: "error",
    text1: title,
    text2: message,
  });
}

export function showInfo(title: string, message: string) {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  Toast.show({
    type: "info",
    text1: title,
    text2: message,
  });
}
