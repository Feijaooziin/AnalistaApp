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
import Header from "../layout/Header";

interface Props {
  title?: string;
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
  expandedSnap = 1.07,
}: Props) {
  const { colors } = useTheme();

  const collapsedHeight = height * initialSnap;
  const expandedHeight = height * expandedSnap;
  const collapsedPosition = expandedHeight - collapsedHeight;
  const collapsedPositionRef = useRef(collapsedPosition);

  const [mounted, setMounted] = useState(false);
  const currentPosition = useRef(collapsedPosition);
  const currentSnap = useRef<"collapsed" | "expanded">("collapsed");
  const translateY = useRef(new Animated.Value(expandedHeight)).current;

  useEffect(() => {
    collapsedPositionRef.current = collapsedPosition;
  }, [collapsedPosition]);

  useEffect(() => {
    if (!visible) return;

    setMounted(true);
    currentSnap.current = "collapsed";
    currentPosition.current = collapsedPositionRef.current;
    translateY.setValue(expandedHeight);

    Animated.timing(translateY, {
      toValue: collapsedPositionRef.current,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible, collapsedPosition]);

  function snapToExpanded() {
    currentPosition.current = 0;
    currentSnap.current = "expanded";

    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      translateY.stopAnimation((value) => {
        console.log("translateY final:", value);
      });
    });
  }

  function snapToCollapsed() {
    currentPosition.current = collapsedPositionRef.current;
    currentSnap.current = "collapsed";

    Animated.spring(translateY, {
      toValue: collapsedPositionRef.current,
      useNativeDriver: true,
    }).start(() => {
      translateY.stopAnimation((value) => {
        console.log("translateY final:", value);
      });
    });
  }

  function animateClose() {
    Animated.timing(translateY, {
      toValue: expandedHeight,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setMounted(false);
      currentSnap.current = "collapsed";
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
          Math.max(0, Math.min(collapsedPositionRef.current, nextPosition)),
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
        <Animated.View {...panResponder.panHandlers}>
          <Header
            variant="close"
            title={title ?? "Selecionar opção"}
            onClosePress={animateClose}
            showLogo={false}
          />
        </Animated.View>
        <View style={{ marginTop: 20 }}>
          {typeof children === "function" ? children(animateClose) : children}
        </View>
      </Animated.View>
    </Modal>
  );
}
