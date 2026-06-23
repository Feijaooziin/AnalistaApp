import { VideoView, useVideoPlayer } from "expo-video";
import { View } from "react-native";

export default function VideoPreview({ file }: any) {
  const player = useVideoPlayer(file.localUri, (player) => {
    player.play();
  });

  return (
    <View style={{ flex: 1 }}>
      <VideoView
        player={player}
        style={{ flex: 1 }}
        // allowsFullscreen
        allowsPictureInPicture
        nativeControls
      />
    </View>
  );
}
