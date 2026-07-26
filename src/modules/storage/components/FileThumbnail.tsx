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

  // Imagem
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

  // Vídeo
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
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppIcon name="play-circle" size={22} color="#FFFFFF" />
        </View>
      </View>
    );
  }

  // Demais arquivos
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FileIcon type={file.fileType} color={colors.text} size={size - 8} />
    </View>
  );
}
