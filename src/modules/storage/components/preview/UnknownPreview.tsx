import { Text, View } from "react-native";

import AppIcon from "@/src/components/icons/AppIcon";
import AppButton from "@/src/components/ui/AppButton";

import { useTheme } from "@/src/contexts/ThemeContext";

import { openFile, shareFile } from "@/src/modules/storage/services/fileOpener";

export default function UnknownPreview({ file }: any) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <AppIcon name="document-outline" size={96} color={colors.text} />

      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 20,
          fontWeight: "700",
          marginTop: 24,
          textAlign: "center",
        }}
      >
        Preview não disponível
      </Text>

      <Text
        style={{
          color: colors.textMuted,
          textAlign: "center",
          marginTop: 8,
        }}
      >
        {file.originalName}
      </Text>

      <Text
        style={{
          color: colors.textMuted,
          marginTop: 8,
        }}
      >
        {file.extension?.toUpperCase()}
      </Text>

      <View
        style={{
          width: "100%",
          marginTop: 32,
          gap: 12,
        }}
      >
        <AppButton
          title="Abrir arquivo"
          leftIcon="open-outline"
          onPress={() => openFile(file.localUri)}
        />

        <AppButton
          title="Compartilhar"
          leftIcon="share-social-outline"
          variant="outline"
          onPress={() => shareFile(file.localUri)}
        />
      </View>
    </View>
  );
}
