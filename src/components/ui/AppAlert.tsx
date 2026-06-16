import { Text, View } from "react-native";

import AppModal from "./AppModal";

interface AppAlertProps {
  visible: boolean;
  title: string;
  message?: string;
  onClose: () => void;
}

export default function AppAlert({
  visible,
  title,
  message,
  onClose,
}: AppAlertProps) {
  return (
    <AppModal visible={visible} onClose={onClose}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 40,
            marginBottom: 16,
          }}
        >
          ⚠️
        </Text>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          {title}
        </Text>

        {!!message && (
          <Text
            style={{
              textAlign: "center",
            }}
          >
            {message}
          </Text>
        )}
      </View>
    </AppModal>
  );
}
