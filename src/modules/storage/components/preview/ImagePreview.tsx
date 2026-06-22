import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function ImagePreview({ file }: any) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Animated.Image
          source={{ uri: file.localUri }}
          style={[{ width: "100%", height: "100%" }, animatedStyle]}
          resizeMode="contain"
        />
      </View>
    </GestureHandlerRootView>
  );
}
