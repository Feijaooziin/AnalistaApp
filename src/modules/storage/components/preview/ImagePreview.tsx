import { useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { Gesture, GestureDetector } from "react-native-gesture-handler";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { useTheme } from "@/src/contexts/ThemeContext";

export default function ImagePreview({ file }: any) {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const scale = useSharedValue(1);

  const pinch = Gesture.Pinch().onUpdate((e) => {
    scale.value = e.scale;
  });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      scale.value = scale.value > 1 ? 1 : 2.5;
    });

  const composedGesture = Gesture.Simultaneous(pinch, doubleTap);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
    ],
  }));

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      {loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}

      <GestureDetector gesture={composedGesture}>
        <Animated.Image
          source={{ uri: file.localUri }}
          resizeMode="contain"
          onLoadEnd={() => setLoading(false)}
          style={[
            {
              flex: 1,
              width: "100%",
              height: "100%",
            },
            animatedStyle,
          ]}
        />
      </GestureDetector>
    </View>
  );
}
