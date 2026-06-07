import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

import { COLORS } from "../constants/colors";

function ToastContainer({
  icon,
  borderColor,
  title,
  message,
}: {
  icon: React.ReactNode;
  borderColor: string;
  title?: string;
  message?: string;
}) {
  return (
    <View
      style={{
        width: "92%",
        backgroundColor: COLORS.primary,
        borderRadius: 14,
        padding: 14,
        borderLeftWidth: 5,
        borderLeftColor: borderColor,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View
        style={{
          marginRight: 12,
        }}
      >
        {icon}
      </View>

      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{
            color: "#FFF",
            fontSize: 22,
            fontWeight: "700",
          }}
        >
          {title}
        </Text>

        {!!message && (
          <Text
            style={{
              color: "#E2E8F0",
              fontSize: 16,
              marginTop: 2,
            }}
          >
            {message}
          </Text>
        )}
      </View>
    </View>
  );
}

export const toastConfig = {
  success: ({ text1, text2 }: BaseToastProps) => (
    <ToastContainer
      title={text1}
      message={text2}
      borderColor={COLORS.success}
      icon={
        <Ionicons
          name="checkmark-circle-outline"
          size={36}
          color={COLORS.success}
        />
      }
    />
  ),

  error: ({ text1, text2 }: BaseToastProps) => (
    <ToastContainer
      title={text1}
      message={text2}
      borderColor={COLORS.danger}
      icon={
        <Ionicons name="alert-circle-outline" size={36} color={COLORS.danger} />
      }
    />
  ),

  info: ({ text1, text2 }: BaseToastProps) => (
    <ToastContainer
      title={text1}
      message={text2}
      borderColor={COLORS.placeholder}
      icon={
        <Ionicons
          name="alert-circle-outline"
          size={36}
          color={COLORS.placeholder}
        />
      }
    />
  ),
};
