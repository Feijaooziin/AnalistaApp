import { Image, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";

import FileIcon from "./FileIcon";

interface Props {
  file: any;
  size?: number;
}

export default function FileThumbnail({ file, size = 42 }: Props) {
  const { colors } = useTheme();

  if (file.fileType === "image") {
    return (
      <Image
        source={{
          uri: file.localUri,
        }}
        style={{
          width: size,
          height: size,
          borderRadius: 10,
        }}
        resizeMode="cover"
      />
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
      <FileIcon type={file.fileType} color={colors.text} size={size - 4} />
    </View>
  );
}
