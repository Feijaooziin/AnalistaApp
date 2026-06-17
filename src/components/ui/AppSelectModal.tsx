import { ReactNode, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Modal, Pressable, View } from "react-native";

import { useTheme } from "@/src/contexts/ThemeContext";
import { RADIUS, SPACING } from "@/src/theme/layout";
import Header from "../layout/Header";

interface Props {
  title?: string;
  visible: boolean;
  onClose: () => void;
  children: ReactNode | ((close: () => void) => ReactNode);
}

const { height } = Dimensions.get("window");

export default function AppSelectModal({
  title,
  visible,
  onClose,
  children,
}: Props) {
  const { colors } = useTheme();

  const [mounted, setMounted] = useState(visible);

  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    if (visible) {
      setMounted(true);

      backdropOpacity.setValue(0);
      scaleAnim.setValue(0);

      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),

        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  function animateClose() {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),

      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMounted(false);
      onClose();
    });
  }

  if (!mounted) return null;

  return (
    <Modal animationType="none" visible={visible} transparent>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* BACKDROP */}
        <Animated.View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            opacity: backdropOpacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
            }),
          }}
        >
          <Pressable
            onPress={animateClose}
            style={{
              flex: 1,
            }}
          />
        </Animated.View>

        {/* CONTENT */}
        <Animated.View
          style={{
            width: "90%",
            maxHeight: height * 0.8,
            backgroundColor: colors.surface,
            borderRadius: RADIUS.lg,
            padding: SPACING.md,
            transform: [
              { scale: scaleAnim },
              {
                translateY: scaleAnim.interpolate({
                  inputRange: [0.95, 1],
                  outputRange: [15, 0],
                }),
              },
            ],
          }}
        >
          {title && (
            <Header
              variant="close"
              title={title}
              onClosePress={animateClose}
              showLogo={false}
            />
          )}
          <View style={{ marginTop: 20 }}>
            {typeof children === "function" ? children(animateClose) : children}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
