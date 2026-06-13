import { ReactNode, useEffect, useRef } from "react";
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
  children: ReactNode;
  heightRatio?: number;
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

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: sheetHeight,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        onClose();
      });
    }
  }, [visible]);

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
          onClose();
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  if (!visible) return null;

  return (
    <Modal animationType="none" visible={visible} transparent>
      {/* BACKDROP */}
      <Pressable
        onPress={onClose}
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

        <View style={{ flex: 1 }}>{children}</View>
      </Animated.View>
    </Modal>
  );
}
