import { Pressable, Text, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { FONT_SIZE, RADIUS, SPACING } from "@/src/theme/layout";

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
        flex: compact ? 1 : undefined,

        flexDirection: compact ? "column" : "row",

        alignItems: compact ? "center" : "center",

        padding: SPACING.lg,

        borderRadius: RADIUS.lg,

        backgroundColor: colors.surface,

        borderWidth: 1,
        borderColor: colors.border,

        gap: compact ? SPACING.md : SPACING.lg,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: compact ? 64 : 52,
          height: compact ? 64 : 52,
        }}
      >
        <FileIcon
          type={file.fileType}
          color={colors.text}
          size={compact ? 42 : 34}
        />
      </View>

      <View
        style={{
          flex: 1,
          alignItems: compact ? "center" : "flex-start",
        }}
      >
        <Text
          numberOfLines={compact ? 2 : 1}
          style={{
            fontSize: FONT_SIZE.md,
            fontWeight: "700",
            color: colors.text,
            textAlign: compact ? "center" : "left",
          }}
        >
          {file.name}
        </Text>

        <Text
          numberOfLines={1}
          style={{
            marginTop: 4,
            color: colors.textSecondary,
            textAlign: compact ? "center" : "left",
          }}
        >
          {file.originalName}
        </Text>

        <Text
          style={{
            marginTop: 6,
            fontSize: FONT_SIZE.xs,
            color: colors.textMuted,
            textAlign: compact ? "center" : "left",
          }}
        >
          {formatSize(file.size)}
        </Text>

        {!!file.createdAt && (
          <Text
            style={{
              marginTop: 2,
              fontSize: FONT_SIZE.xs,
              color: colors.textMuted,
              textAlign: compact ? "center" : "left",
            }}
          >
            {formatDate(file.createdAt)}
          </Text>
        )}
      </View>
    </Pressable>
  );
}
