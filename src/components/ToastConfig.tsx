import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { BaseToastProps } from "react-native-toast-message";
import { useTheme } from "../contexts/ThemeContext";

function ToastContainer({
  icon,
  borderColor,
  backgroundColor,
  title,
  message,
}: {
  icon: React.ReactNode;
  borderColor: string;
  backgroundColor: string;
  title?: string;
  message?: string;
}) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        width: "92%",
        backgroundColor,
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

export function useToastConfig() {
  const { colors } = useTheme();

  return {
    success: ({ text1, text2 }: BaseToastProps) => (
      <ToastContainer
        title={text1}
        message={text2}
        borderColor={colors.success}
        backgroundColor={colors.primary}
        icon={
          <Ionicons
            name="checkmark-circle-outline"
            size={36}
            color={colors.success}
          />
        }
      />
    ),

    error: ({ text1, text2 }: BaseToastProps) => (
      <ToastContainer
        title={text1}
        message={text2}
        borderColor={colors.danger}
        backgroundColor={colors.primary}
        icon={
          <Ionicons
            name="alert-circle-outline"
            size={36}
            color={colors.danger}
          />
        }
      />
    ),

    info: ({ text1, text2 }: BaseToastProps) => (
      <ToastContainer
        title={text1}
        message={text2}
        borderColor={colors.info}
        backgroundColor={colors.info}
        icon={
          <Ionicons
            name="information-circle-outline"
            size={36}
            color={colors.info}
          />
        }
      />
    ),
  };
}
