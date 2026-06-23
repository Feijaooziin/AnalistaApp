import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppIcon from "@/src/components/icons/AppIcon";
import { useTheme } from "@/src/contexts/ThemeContext";

interface Props {
  title: string;
  onClose: () => void;
  onShare?: () => void;
  onOpen?: () => void;
}

export default function FilePreviewHeader({
  title,
  onClose,
  onShare,
  onOpen,
}: Props) {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        backgroundColor: colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <View
        style={{
          height: 60,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          backgroundColor: colors.card,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <TouchableOpacity onPress={onClose}>
          <AppIcon name="arrow-back-outline" size={24} color={colors.text} />
        </TouchableOpacity>

        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            marginHorizontal: 12,
            color: colors.text,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {title}
        </Text>

        <View
          style={{
            flexDirection: "row",
            gap: 16,
          }}
        >
          {!!onOpen && (
            <TouchableOpacity onPress={onOpen}>
              <AppIcon name="open-outline" size={22} color={colors.text} />
            </TouchableOpacity>
          )}

          {!!onShare && (
            <TouchableOpacity onPress={onShare}>
              <AppIcon
                name="share-social-outline"
                size={22}
                color={colors.text}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
