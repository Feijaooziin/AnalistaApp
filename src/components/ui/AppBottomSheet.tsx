import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
} from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { RADIUS, SPACING } from "@/src/theme/layout";
import ScreenContainer from "../layout/ScreenContainer";

interface Props {
  title: String;
  visible: boolean;
  onClose: () => void;
  children: ReactNode | ((close: () => void) => ReactNode);
  initialSnap?: number;
  expandedSnap?: number;
}

const { height } = Dimensions.get("window");

export default function AppBottomSheet({
  title,
  visible,
  onClose,
  children,
  initialSnap = 0.35,
  expandedSnap = 0.95,
}: Props) {
  const { colors } = useTheme();

  const collapsedHeight = height * initialSnap;
  const expandedHeight = height * expandedSnap;

  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const collapsedPosition = expandedHeight - collapsedHeight;
  const currentPosition = useRef(collapsedPosition);
  const currentSnap = useRef<"collapsed" | "expanded">("collapsed");
  const translateY = useRef(new Animated.Value(expandedHeight)).current;

  useEffect(() => {
    if (!visible) return;

    setMounted(true);
    setExpanded(false);

    translateY.setValue(expandedHeight);

    Animated.timing(translateY, {
      toValue: collapsedPosition,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  function snapToExpanded() {
    currentPosition.current = 0;
    currentSnap.current = "expanded";
    setExpanded(true);

    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }

  function snapToCollapsed() {
    currentPosition.current = collapsedPosition;
    currentSnap.current = "collapsed";
    setExpanded(false);

    Animated.spring(translateY, {
      toValue: collapsedPosition,
      useNativeDriver: true,
    }).start();
  }

  function animateClose() {
    Animated.timing(translateY, {
      toValue: expandedHeight,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setMounted(false);
      setExpanded(false);
      onClose();
    });
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onMoveShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dy) > 5;
      },

      onPanResponderMove: (_, gesture) => {
        const nextPosition = currentPosition.current + gesture.dy;

        translateY.setValue(
          Math.max(0, Math.min(collapsedPosition, nextPosition)),
        );
      },

      onPanResponderRelease: (_, gesture) => {
        // ESTAVA EXPANDIDO
        if (currentSnap.current === "expanded") {
          if (gesture.dy > 80) {
            snapToCollapsed();
          } else {
            snapToExpanded();
          }

          return;
        }

        // ESTAVA RECOLHIDO
        if (gesture.dy < -80) {
          snapToExpanded();
          return;
        }

        if (gesture.dy > 180) {
          animateClose();
          return;
        }

        snapToCollapsed();
      },
    }),
  ).current;

  if (!mounted) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      <Pressable
        onPress={animateClose}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      />

      <Animated.View
        {...panResponder.panHandlers}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: expandedHeight,
          backgroundColor: colors.surface,
          borderTopLeftRadius: RADIUS.lg,
          borderTopRightRadius: RADIUS.lg,
          paddingHorizontal: SPACING.md,
          paddingTop: SPACING.md,
          paddingBottom: SPACING.xl,
          transform: [{ translateY }],
        }}
      >
        <ScreenContainer
          modal
          scrollable={false}
          header={{ title: title ? `${title}` : "Opções" }}
        >
          {typeof children === "function" ? children(animateClose) : children}
        </ScreenContainer>
      </Animated.View>
    </Modal>
  );
}
