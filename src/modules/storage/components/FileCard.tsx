import { Pressable, Text, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { RADIUS, SPACING } from "@/src/theme/layout";

import FileIcon from "./FileIcon";

interface Props {
  file: any;
  compact?: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

export default function FileCard({
  file,
  compact = false,
  onPress,
  onLongPress,
}: Props) {
  const { colors } = useTheme();

  function formatSize(size: number) {
    if (!size) return "0 KB";

    const kb = size / 1024;

    if (kb < 1024) {
      return `${kb.toFixed(1)} KB`;
    }

    return `${(kb / 1024).toFixed(1)} MB`;
  }

  function formatDate(date: string) {
    if (!date) return "";

    return new Date(date).toLocaleDateString("pt-BR");
  }

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        flexDirection: compact ? "column" : "row",
        alignItems: "center",
        width: compact ? "48%" : "100%",

        gap: SPACING.sm,

        padding: SPACING.md,

        borderRadius: RADIUS.md,

        backgroundColor: colors.surface,

        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <FileIcon
        type={file.fileType}
        color={colors.text}
        size={compact ? 30 : 26}
      />

      <View
        style={{
          flex: 1,
          alignItems: compact ? "center" : "flex-start",
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontWeight: "600",
            color: colors.text,
            textAlign: compact ? "center" : "left",
          }}
        >
          {file.name}
        </Text>

        <Text
          numberOfLines={1}
          style={{
            color: colors.textSecondary,
            fontSize: 12,
            textAlign: compact ? "center" : "left",
          }}
        >
          {file.originalName}
        </Text>

        {!compact && (
          <Text
            style={{
              color: colors.textMuted,
              fontSize: 11,
            }}
          >
            {formatSize(file.size)}
          </Text>
        )}

        {!compact && !!file.createdAt && (
          <Text
            style={{
              color: colors.textMuted,
              fontSize: 11,
            }}
          >
            {formatDate(file.createdAt)}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
