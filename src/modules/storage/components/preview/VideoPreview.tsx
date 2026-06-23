import { VideoView, useVideoPlayer } from "expo-video";
import { View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";

interface Props {
  file: {
    localUri: string;
  };
}

export default function VideoPreview({ file }: Props) {
  const { colors } = useTheme();

  const player = useVideoPlayer(file.localUri, (player) => {
    player.loop = false;
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <VideoView
        player={player}
        style={{
          flex: 1,
        }}
        nativeControls
        contentFit="contain"
      />
    </View>
  );
}
