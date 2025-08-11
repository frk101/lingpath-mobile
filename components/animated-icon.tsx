/* eslint-disable react/display-name */
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type IconDef = { name: string; type: "FontAwesome" | "FontAwesome5" };

export type AnimatedIconHandle = {
  trigger: (delta: number) => void;
};

type Props = {
  icon: IconDef;
};

const AnimatedIcon = forwardRef<AnimatedIconHandle, Props>(({ icon }, ref) => {
  const IconComp = icon.type === "FontAwesome" ? FontAwesome : FontAwesome5;

  const scale = useSharedValue(1);
  const bubbleOpacity = useSharedValue(0);
  const bubbleTranslateY = useSharedValue(8);
  const [bubbleText, setBubbleText] = useState<string>("");

  useImperativeHandle(ref, () => ({
    trigger: (delta: number) => {
      setBubbleText((delta > 0 ? "+" : "") + delta);

      // ikon pulse
      scale.value = withSequence(
        withTiming(1.15, { duration: 160, easing: Easing.out(Easing.quad) }),
        withTiming(1, { duration: 180, easing: Easing.out(Easing.quad) })
      );

      // balon animasyonu (yukarı çık – görün – kaybol)
      bubbleOpacity.value = withSequence(
        withTiming(1, { duration: 120 }),
        withDelay(650, withTiming(0, { duration: 180 }))
      );
      bubbleTranslateY.value = withSequence(
        withTiming(-18, { duration: 300, easing: Easing.out(Easing.quad) }),
        withDelay(650, withTiming(8, { duration: 180 }))
      );
    },
  }));

  const rIcon = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const rBubble = useAnimatedStyle(() => ({
    opacity: bubbleOpacity.value,
    transform: [{ translateY: bubbleTranslateY.value }],
  }));

  return (
    <View style={styles.wrap}>
      <Animated.View style={[styles.bubble, rBubble]}>
        <Text style={styles.bubbleText}>{bubbleText}</Text>
      </Animated.View>

      <Animated.View style={[styles.icon, rIcon]}>
        <IconComp name={icon.name as any} size={20} color="#fff" />
      </Animated.View>
    </View>
  );
});

export default AnimatedIcon;

const styles = StyleSheet.create({
  wrap: {
    width: 40,
    height: 40,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#13191d",
    borderWidth: 4,
    borderColor: "#272d34",
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: {
    position: "absolute",
    bottom: 40,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.8)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  bubbleText: { color: "#fff", fontSize: 12, fontWeight: "700" },
});
