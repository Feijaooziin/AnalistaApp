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
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      translateY.setValue(height);
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => gesture.dy > 10,
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
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: sheetHeight,
          paddingBottom: SPACING.xl,
          backgroundColor: colors.surface,
          borderTopLeftRadius: RADIUS.lg,
          borderTopRightRadius: RADIUS.lg,
          padding: SPACING.md,
          transform: [{ translateY }],
        }}
      >
        {/* HANDLE */}
        <View
          {...panResponder.panHandlers}
          style={{
            paddingVertical: SPACING.sm,
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
        </View>

        {children}
      </Animated.View>
    </Modal>
  );
}
