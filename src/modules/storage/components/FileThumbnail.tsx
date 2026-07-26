import { Image, View } from "react-native";

import AppIcon from "@/src/components/icons/AppIcon";
import { useTheme } from "@/src/contexts/ThemeContext";

import FileIcon from "./FileIcon";

interface Props {
  file: any;
  size?: number;
}

export default function FileThumbnail({ file, size = 40 }: Props) {
  const { colors } = useTheme();

  if (file.fileType === "image") {
    return (
      <Image
        source={{ uri: file.localUri }}
        style={{
          width: size,
          height: size,
          borderRadius: 8,
        }}
        resizeMode="cover"
      />
    );
  }

  if (file.fileType === "video" && file.thumbnailUri) {
    return (
      <View>
        <Image
          source={{ uri: file.thumbnailUri }}
          style={{
            width: size,
            height: size,
            borderRadius: 8,
          }}
          resizeMode="cover"
        />

        <View
          style={{
            position: "absolute",
            inset: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppIcon name="play-circle" size={22} color="#FFFFFF" />
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FileIcon type={file.fileType} color={colors.text} size={size - 10} />
    </View>
  );
}
