import { Pressable, Text, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { RADIUS, SPACING } from "@/src/theme/layout";

import { formatFileSize } from "../utils/formatFileSize";
import FileIcon from "./FileIcon";

interface Props {
  name: string;
  originalName: string;
  fileType: string;
  size: number;
  onPress?: () => void;
}

export default function FileCard({
  name,
  originalName,
  fileType,
  size,
  onPress,
}: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
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
      <FileIcon type={fileType} color={colors.primary} />

      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          style={{
            fontWeight: "600",
            color: colors.text,
          }}
        >
          {name}
        </Text>

        <Text
          numberOfLines={1}
          style={{
            fontSize: 12,
            color: colors.textSecondary,
          }}
        >
          {originalName} • {formatFileSize(size)}
        </Text>
      </View>
    </Pressable>
  );
}
