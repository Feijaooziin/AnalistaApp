import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
  View,
} from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { RADIUS, SPACING } from "@/src/theme/layout";

interface Props {
  visible: boolean;
  onClose: () => void;
  heightRatio?: number;
  children: ReactNode | ((close: () => void) => ReactNode);
}

const { height } = Dimensions.get("window");

export default function AppBottomSheet({
  visible,
  onClose,
  children,
  heightRatio = 0.35,
}: Props) {
  const { colors } = useTheme();

  const sheetHeight = height * heightRatio;
  const translateY = useRef(new Animated.Value(sheetHeight)).current;

  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);

      translateY.setValue(sheetHeight);

      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  function animateClose() {
    Animated.timing(translateY, {
      toValue: sheetHeight,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setMounted(false);
      onClose();
    });
  }

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        gesture.moveY > height - sheetHeight + 50,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) {
          translateY.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 120) {
          animateClose();
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  if (!mounted) return null;

  return (
    <Modal animationType="none" visible={visible} transparent>
      {/* BACKDROP */}
      <Pressable
        onPress={animateClose}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      />

      {/* SHEET */}
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: sheetHeight,
          backgroundColor: colors.surface,
          borderTopLeftRadius: RADIUS.lg,
          borderTopRightRadius: RADIUS.lg,
          paddingHorizontal: SPACING.md,
          paddingTop: SPACING.md,
          paddingBottom: SPACING.xl,
          transform: [{ translateY }],
        }}
      >
        {/* HANDLE */}
        <Pressable
          style={{
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 60,
              height: 5,
              backgroundColor: colors.border,
              borderRadius: 20,
            }}
          />
        </Pressable>

        <View style={{ flex: 1 }}>
          {typeof children === "function" ? children(animateClose) : children}
        </View>
      </Animated.View>
    </Modal>
  );
}
