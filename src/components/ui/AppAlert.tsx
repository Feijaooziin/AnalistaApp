import { Text, View } from "react-native";

import AppModal from "./AppModal";

interface AppAlertProps {
  visible: boolean;
  title: string;
  onClose: () => void;
}

export default function AppAlert({ visible, title, onClose }: AppAlertProps) {
  return (
    <AppModal visible={visible} onClose={onClose}>
      <View>
        <Text>{title}</Text>
      </View>
    </AppModal>
  );
}
