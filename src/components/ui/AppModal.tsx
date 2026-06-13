import { ReactNode, useEffect, useRef } from "react";
import { Animated, Dimensions, Modal, Pressable, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { RADIUS, SPACING } from "@/src/theme/layout";

interface Props {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

const { height } = Dimensions.get("window");

export default function AppModal({ visible, onClose, children }: Props) {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.95);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal transparent animationType="none" visible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* BACKDROP */}
        <Pressable
          onPress={onClose}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />

        {/* CONTENT */}
        <Animated.View
          style={{
            width: "90%",
            maxHeight: height * 0.8,
            backgroundColor: colors.surface,
            borderRadius: RADIUS.lg,
            padding: SPACING.md,
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}
