import { Pressable, Text, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { RADIUS, SPACING } from "@/src/theme/layout";

import FileIcon from "./FileIcon";

interface Props {
  file: any;
  onPress: () => void;
  onLongPress: () => void;
}

export default function FileCard({ file, onPress, onLongPress }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: SPACING.md,
        padding: SPACING.md,
        borderRadius: RADIUS.md,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <FileIcon type={file.fileType} color={colors.text} />

      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          style={{ fontWeight: "600", color: colors.text }}
        >
          {file.name}
        </Text>

        <Text
          numberOfLines={1}
          style={{ color: colors.textSecondary, fontSize: 12 }}
        >
          {file.originalName}
        </Text>
      </View>
    </Pressable>
  );
}
